"use strict";

  angular
    .module('app.controllers')
    .controller('accountsCtrl', accountsCtrl);

function accountsCtrl($scope, $state, $location, apiCall, filepath, $rootScope)
{
    var accounts = this;

    accounts.login = Login;
    accounts.logout = Logout;
    accounts.register = Register;
    accounts.forgotPass = forgotPass;
    accounts.changePword = changePword;
    accounts.deleteAcct = deleteAcct;
    accounts.updateClick = updateAcc;
    accounts.update = update;
    accounts.upload = upload;
    accounts.deleteNot = deleteNot;
    accounts.deleteApplication = deleteApplication;
    var $userData = $rootScope.userinfo;

    switch($state.current.name)
    {
        case "Account":        
            if($userData)
            {
                $location.path('Account/Dashboard');
            }
            else if(!$userData)
            {
                $location.path('Account/Login');
            }
            break;
        
        case "acctLogin":
                if($userData){

                    $location.path('Account/Dashboard');

                }

            break;

        case "acctRegister":
        case "acctForgotPass":
        case "acctSetting":        
            break;
        
        case "Applied":        
            if(!$userData)
            {
                $location.path('Account/Login');
            }
            else if($userData)
            {
                $location.path('Account/Applied');
                Applied();
            }
            break;
        
        case "acctProfile":        
            if(!$userData)
            {
                $location.path('Account/Login');
            }
            else if($userData)
            {
                acctProfile();
            }
            break;

         case "Delete":        
            if(!$userData)
            {
                $location.path('Account/Login');
            }
            break;
        
        case "acctDashboard":
            if(!$userData)
            {
                $location.path('Account/Login');
            }
            else if($userData)
            {
                Dashboard();
            }
            break;
        
        default:        
            $location.path('404')
            break;
        
    }

   function Login()
    {  
        apiCall
         .post(
            'accounts/login',
            {
                username: accounts.username,
                password: accounts.password,
            },
             function(response)
            {   
                if(response.status == 401)
                {
                    accounts.errMsg = response.output.response;
                }
                else if(response.status == 200)
                {
                    apiCall
                        .get(
                            'accounts/username/'+accounts.username,
                            function(acctresponse)
                            {
                                $userData = {} = acctresponse.data.output.response[0];
                                sessionStorage.setItem('accountinfo', JSON.stringify($userData));
                                sessionStorage.setItem('accounttoken', response.output.response.token);
                                accounts.errMsg = '';
                                accounts.succMsg = 'Logged In';
                                setTimeout(function(){ window.location = 'Account/Dashboard'}, 3000);
                            }

                         );

                } 
                else
                {
                    accounts.errMsg = "Server error please retry your credentials";
                }
            }
         );
    }

    function Register()
    {
          apiCall
         .post(
            'accounts/register',
            {
                password:accounts.pass,
                username: accounts.username,

            },
            function(response)
           {   
                if(response.status == 200)
                {
                    apiCall
                        .post(
                         'accounts',
                         {
                            email: accounts.email,
                            lastname: accounts.lastname,
                            phone: accounts.phone,
                            firstname: accounts.firstname,
                            gender: accounts.gender,
                            username: accounts.username,
                            address: accounts.address,
                        },
                        function(acctresponse)
                        {
                            if(response.status == 200)
                            {
                                apiCall
                                    .post(
                                     'email/notify',
                                     {

                                            email: 'michelle@almondcareers.com',
                                            sender: 'Epic Jobs Portal',
                                            reciepient: accounts.email,
                                            subject: 'Account Created on Epic Jobs Portal',
                                            message: 'Your account has been successfully created on our platform, we wish you the best</p>',

                                    },function(emailresponse){}

                                    );
                            }
                        }
                    );
                    $userData = response.output.response.data;
                    sessionStorage.setItem('accountinfo', JSON.stringify($userData));
                    sessionStorage.setItem('accounttoken', response.output.response.token);
                    accounts.succMsg = 'Successfully Registered, Please Wait';
                     setTimeout(function(){ window.location = 'Account'}, 3000);
                    
                } 
                else
                {
                    accounts.errMsg = "Server error please retry your credentials";
                }
            }
         );


    }
    
    function forgotPass()
    {

    }

    function Dashboard()
    {


    }

    function Applied()
    {
        apiCall
        .get(
            'jobs/applied/username/'+$rootScope.userinfo.username,
            function(response)
            {
                accounts.data = {} = response.data.output.response;
                 console.info(accounts.data);

            }

            );
    }


    function update() 
    {
        alert($rootScope.userinfo.first_name);
        apiCall
            .put(
              'accounts/authid/'+$rootScope.userinfo.authid,
              {

                email: $rootScope.userinfo.email,
                last_name: $rootScope.userinfo.last_name,
                mobile: $rootScope.userinfo.mobile,
                first_name:$rootScope.userinfo.first_name,
                gender: $rootScope.userinfo.gender,
                authid:$rootScope.userinfo.authid,
               
            },
            function(response)
            {   
                accounts.succMsg = "Success";

                console.info($rootScope.userinfo);
            }
        );
    }

    function updateAcc() 
    {
        $rootScope.demo = document.getElementById("demo");

        $("button").click(function(){
            $("#demo").hide("slow","linear",
                $("#demo2").show(
                    "slow","linear",
                $(":input").removeAttr("disabled")                   
                ));
            }); 
    }



    function deleteAcct()
    {

        apiCall
            .remove(
            'accounts/authid/'+$rootScope.userinfo.authid,
            {
                authid: $rootScope.userinfo.authid,
            },
            function(response)
            {   
                apiCal
                    .remove(
                    'accounts/remove/authid/'+$rootScope.userinfo.authid,
                    {
                        authid: $rootScope.userinfo.authid,
                    },
                    function(response)
                    {   
                         sessionStorage.clear() ;
                        window.location = 'Account/Login'; 
                    }
                );
            }
        );
    }

    function deleteApplication()
    {
        apiCall
            .remove(
            'accounts/applied/authid/'+$rootScope.userinfo.authid+'/jobtitle/'+accounts.data['jobtitle'],
            {
                authid: $rootScope.userinfo.authid,
            },
            function(response)
            {   
                   accounts.deleteMsg = 'Deleted Successfully';
               
            }
        );

    }

    function changePword()
    {

    }

    function deleteNot() 
    {
        
        window.location = 'Account/Dashboard';
    }

    function upload()
    {
        var ext = $('input#file').val().split('.').pop().toLowerCase();
        $rootScope.filemodule = 'accounts/files';
        $('input#file').click();
        $rootScope.$watch('filename', function () 
        {
            if($rootScope.filename !== undefined)
            {
               update();
            }
        }, 
        true);
    }

    function Logout(){

        sessionStorage.clear() ;
        window.location = 'Account/Login';                     
    }
}
