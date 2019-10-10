// Função para máscara de telefone
 function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}
function mtel(v) {
    v = v.replace(/\D/g, "");             //Remove tudo o que não é dígito
    v = v.replace(/(\d)(\d{8})$/, "$1-$2");    //Coloca hífen entre o segundo e o terceiro dígitos
    return v;
}
function id(el) {
    return document.getElementById(el);
}
window.onload = function () {
    id('telefone').onkeypress = function () {
        mascara(this, mtel);
    }
}

//Função para envio do JSON

function converteJson(){

    ret = {}
    $("form [name]").each(function(ind,row){

        var $elemento = $(row);
        var nome = $elemento.attr("name");

        if( $elemento.attr("type") == "radio" ){
            if( $elemento.prop("checked") ){
                var value = $elemento.val();
                ret[nome] = value;	
            }

        }
        else if( $elemento.attr("type") == "checkbox" ){
            if( $elemento.prop("checked") ){
                var value = $elemento.val();
                ret[nome] = value;	
            }
        }
        else{
            var value = $elemento.val();
            ret[nome] = value;	
        }
    })
    
    return JSON.stringify(ret);

}


// Função para ocultar os campos de "Redes Sociais" quando o usuário informa que não possui
jQuery($("[name='redes']")).change(function(){
      
    if($( "input[type=radio][name=redes]:checked" ).val() === "sim"){
        $("#redesSociais").attr("hidden",false);
    }else{
        $("#redesSociais").attr("hidden",true);
    }
});

// Função para formatação do e-mail
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  
  $('document').ready(function(){
    $('#email').blur(function(){
      if (isEmail($(this).val())){
        console.log("E-mail OK!");
    }else{
        alert("Formato inválido!");
        $("#email").val("");
      }
    })
  })

$('#formDesafio').validate({

    rules: {

        nome: { 
            required: true
        },
        sobrenome: { 
            required: true
        },

    },
    messages: {

        nome: { required: 'Informe o seu nome', nome: 'Nome inválido' },
        sobrenome: { required: 'Informe o seu sobrenome', sobrenome: 'Sobrenome inválido' },

    },
    submitHandler: function (form) {
        $.ajax({
        type: "POST",
        url: "http://localhost:8080",
        data: converteJson()
    
        });

        $('#enviar').attr("disabled", true);
        alert("Formulário enviado com sucesso!")
        $('#formDesafio').each (function(){
            this.reset();
          });
    }
    });
