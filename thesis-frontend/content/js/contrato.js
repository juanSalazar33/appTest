var contrato = {
    delete: null,
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.getInstrument();
        this.getStudent();
        this.getContrato();
    },
    cacheDom: function() {
      sico.$content.classList.remove('w3-hide');
      // The el element of the instrument app
      this.$el = sico.$content;
      
      
      this.$registerFormC = this.$el.querySelector('#formRegisterContrato');
      this.$RFElementsC = this.$el.querySelectorAll('.dataForm4');

      this.$btnSaveComodato = this.$el.querySelector('#registrarContrato');

      //console.log(this.$RFElementsC)
  
    },
    bindEvents: function(){
        document.getElementById('registrarContrato').addEventListener('click', (event) =>{
        contrato.saveContrato();
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
          var listInstrument = '<option disabled selected>Seleccione un instrumento</option>';
          Arrayinstrument.forEach(i => {
            if(i == undefined){

            }else{
                listInstrument +='<option value='+i.codigo+'>'+i.name+'  '+i.codigo+'</option>';
            }
          });
          console.log(listInstrument);
          if(!listInstrument|| listInstrument == undefined || listInstrument == null){
            console.log('vacio');
          }else{
              document.getElementById('listaInstrumentos').innerHTML = listInstrument;
          }
        }
      });
    },
    getStudent: function(){
        const url = 'http://localhost:3001/api/students';
    
        fetch(url)
        .then((resp) => resp.json()) // We transform the data into JSON
        .then(function(students) {
          if(!students) {
            console.log('error al consutar student');
          } else {              
            var ArrayStudent = students.student;
            var listStudent = '<option value="" disabled selected>Seleccione un alumno</option>';
            ArrayStudent.forEach(i => {
              if(i == undefined){
  
              }else{
                listStudent +='<option value='+i.ci+'>'+i.name+'  ci: '+i.ci+'</option>';
              }
            });
            console.log(listStudent);
            if(!listStudent || listStudent == undefined){
  
            }else{
                document.getElementById('listaStudents').innerHTML = listStudent;
            }
          }
        });
      },
      getContrato: function(){
        const url = 'http://localhost:3001/api/contratos';
    
        fetch(url)
        .then((resp) => resp.json()) // We transform the data into JSON
        .then(function(contratos) {
          if(!contratos) {
            console.log('error al consutar student');
          } else {              
            var ArrayContratos = contratos.contrato;
            var tarjetas = '';
            ArrayContratos.forEach(i => {
              if(i == undefined){
  
              }else{
                tarjetas +='<div class="w3-col l4 m12 s12 w3-padding-16"><div class="w3-round w3-green w3-row-padding w3-padding-8"><h3>Estado: Activo</h3><h6>Ci Alumno: '+i.ci+'</h6><h6 class="w3-center">Codigo Instrumento: '+i.codigo+'</h6><h6>Vence: '+i.fechaVen+'</h6></div></div>';
              }
            });
            console.log(tarjetas);
            if(!tarjetas || tarjetas == undefined){
  
            }else{
                document.getElementById('contentContratos').innerHTML = tarjetas;
            }
          }
        });
      }, 
    saveContrato: function(){
       
      if(this.$RFElementsC[0].value == '' || this.$RFElementsC[1].value == '' || this.$RFElementsC[2].value == ''){
        document.getElementById('msgAlertC').style.display='block';
      }
      else{
        document.getElementById('msgAlertC').style.display='none';
        var data = [];
        const url = 'http://localhost:3001/api/contrato'; 
        //console.log(this.$RFElements);
        data.ci= this.$RFElementsC[1].value;
        data.codigo = this.$RFElementsC[0].value;
        data.fechaVen = this.$RFElementsC[2].value;
        // var json = JSON.stringify(data);
        ///console.log(data);
        fetch(url, {
          method: 'post',
          body:new URLSearchParams("ci="+data.ci+"&codigo="+data.codigo+"&fechaVen="+data.fechaVen)
        }).then(function(resp) {
            if(!resp) {
                console.log('error al registrar instrumento');
            } else {
                console.log(resp);
                document.getElementById('registerC').style.display='none';
                document.getElementById('msgCreateC').style.display='block';
                document.getElementById('formRegisterContrato').reset();
                contrato.getContrato();
            }
        });
      }
  
    }
  }
  