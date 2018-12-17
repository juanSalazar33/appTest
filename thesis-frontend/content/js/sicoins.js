var sico = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    //this.getUsers();
    // this.selectView();
  },
  cacheDom: function() {
    // The el element of the sico app
    this.$el = document.querySelector('body');
    // Service Content
    this.$content = this.$el.querySelector('#content');
    this.$navBar = this.$el.querySelector('#navBar');
    this.$navBtns = this.$el.querySelectorAll('.optionNav');

    this.$LoginForm = this.$el.querySelector('#formLogin');
    this.$LGElements = this.$LoginForm.querySelectorAll('.dataForm');
    this.$btnIniciar = this.$el.querySelector('#loginBtn');

    this.$msgAlert = this.$el.querySelector('#msgAlert');
    this.$registerU = this.$el.querySelector('#registerU');
    this.$textErrorRegiser = this.$el.querySelector('#msgAlertFormR h1');

    this.$recuperacion1 = this.$el.querySelector('#r1');
    this.$recuperacion2 = this.$el.querySelector('#r2');

    this.$exitS = this.$el.querySelector('#exitSystem');
  },

  bindEvents: function(){
    // We bind the click event to every button of the test (back, next and finish).
    this.$navBtns.forEach((e) => {
      e.addEventListener('click', (event) => {
        sico.selectView(event);
      });
    });

    this.$exitS.addEventListener('click', (event) =>{
      sico.exitSistema();
    });
    
    this.$recuperacion1.addEventListener('click', (event) =>{
      document.getElementById('recuperar2').classList.remove('w3-hide');
    });

    this.$recuperacion2.addEventListener('click', (event) =>{
      document.getElementById('recuperar3').classList.remove('w3-hide');
    });
    
    this.$btnIniciar.addEventListener('click', (event) =>{
      sico.validateUser();
    });
  },
  getUsers: function(){
    const url = 'http://localhost:3001/api/users';

    fetch(url)
    .then((resp) => resp.json()) // We transform the data into JSON
    .then(function(user) {
        if(!user) {
            console.log('error al consutar usuario');
        } else {
            console.log(user);
            //this.$registerU.style.diplay = "none";
        }
    });
  },
  validateUser: function(){
    var vi;
    let ci = this.$LGElements[0].value;
    let clave = this.$LGElements[1].value;

    const url = 'http://localhost:3001/api/userValidate?ci='+ci+'&clave='+clave;

    console.log(url);

    fetch(url)
    .then((resp) => resp.json()) // We transform the data into JSON
    .then(function(user) {
        if(!user.user[0]) {
            console.log('error al consutar usuario');
            document.getElementById('errorLogin').classList.remove('w3-hide');
        } 
        else {
          document.getElementById('loginForm').classList.add('w3-hide');
          document.getElementById('navBar').classList.remove('w3-hide');
          document.getElementById('nameUser').innerHTML = user.user[0].name;
          vi = 'contrato.html';
          let req = new XMLHttpRequest();
          method = 'GET';
    
          req.open(method, vi, true);
      
          req.onload = function() {
            sico.$content.innerHTML = this.responseText;
            contrato.init();
          }
      
          req.send();

          //this.$registerU.style.diplay = "none";
        }
    });
  },
  saveUser: function(){
    if(this.$RFElements[0].value == '' || this.$RFElements[1].value == '' || this.$RFElements[2].value == '' || this.$RFElements[3].value == '' || this.$RFElements[4].value == '' || this.$RFElements[5].value == '' || this.$RFElements[6].value == '' || this.$RFElements[7].value == '' || this.$RFElements[8].value == '' || this.$RFElements[9].value == '' || this.$RFElements[10].value == ''  || this.$RFElements[11].value == '' ){

      document.getElementById('msgAlertFormR').style.display='block';
      document.getElementById('msgAlert1').style.display='block';
      document.getElementById('msgAlert2').style.display='none';
    }
    else if (this.$RFElements[2].value !== this.$RFElements[5].value){
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
      data.clave = this.$RFElements[2].value;
      data.gender = this.$RFElements[6].value;
      data.mail = this.$RFElements[4].value;
      data.number = this.$RFElements[1].value;
      data.cargo = this.$RFElements[7].value;
      data.q1 = this.$RFElements[8].value;
      data.q2 = this.$RFElements[10].value;
      data.a1 = this.$RFElements[9].value;
      data.a2 = this.$registerForm[11].value;
      // var json = JSON.stringify(data);
      ///console.log(data);
      fetch(url, {
        method: 'post',
        body:new URLSearchParams("ci="+data.ci+"&name="+data.name+"&clave="+data.clave+"&gender="+data.gender+"&mail="+data.mail+"&number="+data.number+"&cargo="+data.cargo+"&q1="+data.q1+"&q2="+data.q2+"&a1="+data.a1+"&a2="+data.a2)
      }).then(function(resp) {
          if(!resp) {
              console.log('error al registrar usuario');
          } else {
              console.log(resp);
              document.getElementById('registerU').style.display='none';
              document.getElementById('msgAlert').style.display='block';
              document.getElementById('formRegister').reset();
          }
      });
    }

  },
  selectView: function(event) {
    let view;
    if(!event){
      view = "null";
    }else{view = event.target.id;}
    
    let module;
    let vi;

    switch (view) {
      case 'ALM':
        vi = 'alumno.html';
        break;
      case 'IMT':
        vi = 'instrumento.html';
        
        break;
      case 'CMT':
          vi = 'contrato.html';
        break;
      default:
        //this.$loginForm.classList.remove('w3-hide');
        
    }

    let req = new XMLHttpRequest();
      method = 'GET';

    req.open(method, vi, true);

    req.onload = function() {
      sico.$content.innerHTML = this.responseText;      
      switch (view) {
        case 'ALM':
          student.init();
        break;
      case 'IMT':
        instrument.init();
        
        break;
      case 'CMT':
        contrato.init();
          
        break;
      }

    }

    req.send();

  },
  exitSistema: function(){
    this.$content.classList.add('w3-hide');
    document.getElementById('loginForm').classList.remove('w3-hide');
    document.getElementById('navBar').classList.add('w3-hide');
    document.getElementById('exit').style.display='none'; formLogin
    document.getElementById('formLogin').reset();
  }
  
}
sico.init();
