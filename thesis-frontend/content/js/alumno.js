var student = {
    delete: null,
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.getAlumno();
    },
    cacheDom: function() {
      // The el element of the student app
      this.$el = sico.$content;
     
      this.$registerForm = this.$el.querySelector('#formRegister');
      this.$RFElements = this.$el.querySelectorAll('.dataForm');

      this.$btnSaveStudent = this.$el.querySelector('#registrar');
      this.$tbodyA = this.$el.querySelector('#tableAlumnos');
      this.$modaDeleteStudent = this.$el.querySelector('#deleteStudent');
      this.$yesDelete = this.$modaDeleteStudent.querySelector('#yesDelete');

      this.$conInstrumento = this.$el.querySelector('#conI');
      this.$sinInstrumento = this.$el.querySelector('#sinI');
      this.$buscar = this.$el.querySelector('#buscar');
      this.$ciBusqueda = this.$el.querySelector('#cedula');
  
    },
    cacheNew: function(){

      this.$deleteBtn = this.$el.querySelectorAll('.deleteBtn');
      this.$deleteBtn.forEach((e) => {
        e.addEventListener('click', (event) => {
          let ci = parseInt(event.target.id); 
          this.delete = ci;
          this.$modaDeleteStudent.style.display = 'block';
          
        });
      });

      this.$yesDelete.addEventListener('click', (event) =>{
        student.deleteStudent(this.delete);
      });
    },
    bindEvents: function(){
      this.$btnSaveStudent.addEventListener('click', (event) =>{
        student.saveUser();
      });

      this.$buscar.addEventListener('click', (event) =>{
        let ci = parseInt(this.$ciBusqueda.value);

        if(!ci || ci == null){
          console.log('busqueda vacia');
        }else{
          student.getAlumnoByCi(ci);
        }

      });
    },
    getAlumno: function(){
      const url = 'http://localhost:3001/api/users';
  
      fetch(url)
      .then((resp) => resp.json()) // We transform the data into JSON
      .then(function(users) {
        if(!users) {
          console.log('error al consutar alumno');
        } else {              
          var Arraystudent = users.user;
          var tableA = '';
          Arraystudent.forEach(i => {
            if(i == undefined){

            }else{
              tableA +='<tr><td class="w3-center">'+i.ci+'</td><td class="w3-center">'+i.name+'</td><td class="w3-center">'+i.mail+'</td><td class="w3-center deleteBtn" id='+i.ci+'><i class="fa fa-trash"></i></td></tr>';
            }
          });

          if(!tableA || tableA == undefined){

          }else{
              document.getElementById('tableAlumnos').innerHTML = tableA;
              student.cacheNew();
          }
        }
      });
    },
    getAlumnoByCi: function(ci){
      const url = 'http://localhost:3001/api/user?ci='+ci;
  
      fetch(url)
      .then((resp) => resp.json()) // We transform the data into JSON
      .then(function(users) {
        if(!users) {
          console.log('error al consutar alumno');
        } else {              
          var Arraystudent = users.user;
          var tableA = '';
          Arraystudent.forEach(i => {
            if(i == undefined){

            }else{
              tableA +='<tr><td class="w3-center">'+i.ci+'</td><td class="w3-center">'+i.name+'</td><td class="w3-center">'+i.mail+'</td><td class="w3-center deleteBtn" id='+i.ci+'><i class="fa fa-trash"></i></td></tr>';
            }
          });

          if(!tableA || tableA == undefined){

          }else{
              console.log(tableA);
              document.getElementById('tableAlumnos').innerHTML = tableA;
              student.cacheNew();
          }
        }
      });
    },
    saveUser: function(){
      if(this.$RFElements[0].value == '' || this.$RFElements[1].value == '' || this.$RFElements[2].value == '' || this.$RFElements[3].value == '' ){
  
        document.getElementById('msgAlertFormR').style.display='block';
        document.getElementById('msgAlert1').style.display='block';
        document.getElementById('msgAlert2').style.display='none';
      }
      else if (this.$RFElements[1].value !== this.$RFElements[2].value){
        document.getElementById('msgAlertFormR').style.display='block';
        document.getElementById('msgAlert2').style.display='block';
        document.getElementById('msgAlert1').style.display='none';
      }else{
        document.getElementById('msgAlertFormR').style.display='none';
        var data = [];
        const url = 'http://localhost:3001/api/user'; 
        //console.log(this.$RFElements);
        data.ci = this.$RFElements[0].value;
        data.name = this.$RFElements[3].value;
        data.clave = this.$RFElements[1].value;
        data.mail = this.$RFElements[4].value;
        // var json = JSON.stringify(data);
        ///console.log(data);
        fetch(url, {
          method: 'post',
          body:new URLSearchParams("ci="+data.ci+"&name="+data.name+"&clave="+data.clave+"&mail="+data.mail)
        }).then(function(resp) {
            if(!resp) {
                console.log('error al registrar usuario');
            } else {
                console.log(resp);
                document.getElementById('registerU').style.display='none';
                document.getElementById('msgAlert').style.display='block';
                document.getElementById('formRegister').reset();
                student.getAlumno();
            }
        });
      }
  
    },
    deleteStudent: function(ci){

        const url = 'http://localhost:3001/api/user?ci='+ci; 

        fetch(url, {
          method: 'DELETE'
        }).then(function(resp) {
            if(!resp) {
                console.log('error al registrar alumno');
            } else {
                console.log(resp);
                document.getElementById('deleteStudent').style.display='none';
                student.getAlumno();
            }
        });
    }
  }
  