var instrument = {
    delete: null,
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.getInstrument();
    },
    cacheDom: function() {
      // The el element of the instrument app
      this.$el = sico.$content;
     
      this.$registerFormI = this.$el.querySelector('#formRegisterInstrument');
      this.$RFElementsI = this.$registerFormI.querySelectorAll('.dataForm3');

      this.$btnSaveinstrument = this.$el.querySelector('#registrarInstrument');
      this.$tbodyA = this.$el.querySelector('#tableInstrument');
      this.$modaDeleteinstrument = this.$el.querySelector('#deleteInstrument');
      this.$yesDelete = this.$modaDeleteinstrument.querySelector('#yesDeleteI');

      //this.$conInstrumento = this.$el.querySelector('#conI');
      //this.$sinInstrumento = this.$el.querySelector('#sinI'); 
  
    },
    cacheNew: function(){

      this.$btnEdit = this.$el.querySelectorAll('.editButton');
      this.$btnEdit.forEach((e) => {
        e.addEventListener('click', (event) => {
        });
      });

      this.$deleteBtn = this.$el.querySelectorAll('.deleteBtn');
      this.$deleteBtn.forEach((e) => {
        e.addEventListener('click', (event) => {
          let codigo = parseInt(event.target.id); 
          this.delete = codigo;
          this.$modaDeleteinstrument.style.display = 'block';
          
        });
      });

      this.$yesDelete.addEventListener('click', (event) =>{
        instrument.deleteInstrument(this.delete);
      });
    },
    bindEvents: function(){
      this.$btnSaveinstrument.addEventListener('click', (event) =>{
        instrument.saveInstrument();
      });
    },
    getInstrument: function(){
      const url = 'http://localhost:3001/api/instruments';
  
      fetch(url)
      .then((resp) => resp.json()) // We transform the data into JSON
      .then(function(instruments) {
        if(!instruments) {
          console.log('error al consutar instrument');
        } else {              
          var Arrayinstrument = instruments.instrument;
          var tableA = '';
          Arrayinstrument.forEach(i => {
            if(i == undefined){

            }else{
              tableA +='<tr><td class="w3-center">'+i.name+'</td><td class="w3-center">'+i.codigo+'</td><td class="w3-center">'+i.availability+'</td><td class="w3-center">'+i.category+'</td><td class="w3-center deleteBtn" id='+i.codigo+'><i class="fa fa-trash"></i></td><td class="w3-center editButton"><i class="fa fa-edit"></i></td></tr>';
            }
          });

          if(!tableA || tableA == undefined){

          }else{
              document.getElementById('tableInstrument').innerHTML = tableA;
              instrument.cacheNew();
          }
        }
      });
    },
    getAlumnoByI: function(i){
      const url = 'http://localhost:3001/api/instrumentByI?instrument='+i;
  
      fetch(url)
      .then((resp) => resp.json()) // We transform the data into JSON
      .then(function(instruments) {
        if(!instruments) {
          console.log('error al consutar alumno');
        } else {              
          var Arrayinstrument = instruments.instrument;
          var tableA = '';
          Arrayinstrument.forEach(i => {
            if(i == undefined){

            }else{
              tableA +='<tr><td class="w3-center">'+i.ci+'</td><td class="w3-center">'+i.name+'</td><td class="w3-center">'+i.rol+'</td><td class="w3-center">'+i.gender+'</td><td class="w3-center deleteBtn" id='+i.ci+'><i class="fa fa-trash"></i></td><td class="w3-center editButton"><i class="fa fa-edit"></i></td></tr>';
            }
          });

          if(!tableA || tableA == undefined){

          }else{
              console.log(tableA);
              document.getElementById('tableAlumnos').innerHTML = tableA;
              instrument.cacheNew();
          }
        }
      });
    },
    getAlumnoByCi: function(ci){
      const url = 'http://localhost:3001/api/instrument?ci='+ci;
  
      fetch(url)
      .then((resp) => resp.json()) // We transform the data into JSON
      .then(function(instruments) {
        if(!instruments) {
          console.log('error al consutar alumno');
        } else {              
          var Arrayinstrument = instruments.instrument;
          var tableA = '';
          Arrayinstrument.forEach(i => {
            if(i == undefined){

            }else{
              tableA +='<tr><td class="w3-center">'+i.ci+'</td><td class="w3-center">'+i.name+'</td><td class="w3-center">'+i.rol+'</td><td class="w3-center">'+i.gender+'</td><td class="w3-center deleteBtn" id='+i.ci+'><i class="fa fa-trash"></i></td><td class="w3-center editButton"><i class="fa fa-edit"></i></td></tr>';
            }
          });

          if(!tableA || tableA == undefined){

          }else{
              console.log(tableA);
              document.getElementById('tableAlumnos').innerHTML = tableA;
              instrument.cacheNew();
          }
        }
      });
    },
    saveInstrument: function(){
        console.log('hi');
      if(this.$RFElementsI[0].value == '' || this.$RFElementsI[1].value == '' || this.$RFElementsI[2].value == '' || this.$RFElementsI[3].value == '' || this.$RFElementsI[4].value == '' || this.$RFElementsI[5].value == ''){
        document.getElementById('msgAlertInstrument').style.display='block';
      }
      else{
        document.getElementById('msgAlertInstrument').style.display='none';
        var data = [];
        const url = 'http://localhost:3001/api/instrument'; 
        //console.log(this.$RFElements);
        data.codigo = this.$RFElementsI[1].value;
        data.name = this.$RFElementsI[0].value;
        data.procedent = this.$RFElementsI[2].value;
        data.availability = this.$RFElementsI[3].value;
        data.category = this.$RFElementsI[4].value;
        data.size = this.$RFElementsI[5].value;

        // var json = JSON.stringify(data);
        ///console.log(data);
        fetch(url, {
          method: 'post',
          body:new URLSearchParams("codigo="+data.codigo+"&name="+data.name+"&procedent="+data.procedent+"&availability="+data.availability+"&category="+data.category+"&size="+data.size)
        }).then(function(resp) {
            if(!resp) {
                console.log('error al registrar instrumento');
            } else {
                console.log(resp);
                document.getElementById('registerI').style.display='none';
                document.getElementById('msgCreateInstrument').style.display='block';
                document.getElementById('formRegisterInstrument').reset();
                instrument.getInstrument();
            }
        });
      }
  
    },
    deleteInstrument: function(i){

        const url = 'http://localhost:3001/api/instrument?IID='+i; 

        fetch(url, {
          method: 'DELETE'
        }).then(function(resp) {
            if(!resp) {
                console.log('error al eliminar instrumento');
            } else {
                console.log(resp);
                document.getElementById('deleteInstrument').style.display='none';
                instrument.getInstrument();
            }
        });
    }
  }
  