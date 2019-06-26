"use strict";

  angular
    .module('app.controllers', [])
    .controller('mainCtrl', mainCtrl);

function mainCtrl($scope, $state, $location, apiCall, filepath, $rootScope)
{
    var main = this; 

    main.data = {};


    main.login = Login;
    main.logout = Logout;
    // main.deleteAcct = deleteAcct;
    // main.updateClick = updateAcc;
    // main.update = update;
    
    var $userData = $rootScope.userinfo;

       switch($state.current.name)
    {
        case "Dashboard":        
            if($userData)
            {
                $location.path('Dashboard');

                getJobs();
                getEmployers();
                getUsers();
            }
            else if(!$userData)
            {
                $location.path('Login');
            }
            break;
        
        case "Login":
                if($userData){

                    $location.path('Dashboard');

                }
             else if(!$userData)

             {
             	$location.path('Login');
             }

            break;

            case "Jobs":        
            if(!$userData)
            {
                $location.path('Login');
            }

            else if($userData)
            {
            	$location.path('Jobs');
                getJobs();
            }
            break;

         case "Employers":        
            if(!$userData)
            {
                $location.path('Login');
            } 
            else if($userData)
            {
                $location.path('Employers');
                getEmployers();
            }
            break;
        
        case "Users":
            if(!$userData)
            {
                $location.path('Login');
            }
             else if($userData)
            {
                $location.path('Users');
                getUsers();
            }
            break;

          case "Applications":
            if(!$userData)
            {
                $location.path('Login');
            }
             else if($userData)
            {
                $location.path('Applications');
                getApplications();
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
            'admin/login',
            {
                username: main.username,
                password: main.password,
            },
             function(response)
            {   
                if(response.status == 401)
                {
                    main.errMsg = response.output.response;
                }
                else if(response.status == 200)
                {
                    apiCall
                        .get(
                            'admin/username/'+main.username,
                            function(acctresponse)
                            {
                                $userData = {} = acctresponse.data.output.response[0];
                                sessionStorage.setItem('accountinfo', JSON.stringify($userData));
                                sessionStorage.setItem('accounttoken', response.output.response.token);
                                main.errMsg = '';
                                main.succMsg = 'Logged In';
                                setTimeout(function(){ window.location = 'Dashboard'}, 3000);
                            }

                         );

                } 
                else
                {
                    main.errMsg = "Server error please retry your credentials";
                }
            }
         );
    }

     function Logout(){

        sessionStorage.clear() ;
        window.location = 'Login';                     
    }


    
 function getJobs()
    {
        apiCall
             .get(
               'jobs', 
                function(response)
                {
                    main.data['jobs'] = response.data.output.response;
                }
              );

    }
    
    function getEmployers()
    {
        apiCall
             .get(
               'employers', 
                function(response)
                {
                    main.data['employers'] = response.data.output.response;
                }
              );

    }

    function getUsers()
    {
        apiCall
             .get(
               'accounts', 
                function(response)
                {
                    main.data['users'] = response.data.output.response;
                }
              );

    }


    function getApplications()
    {
        apiCall
             .get(
               'jobs/applied', 
                function(response)
                {
                    main.data['applications'] = response.data.output.response;
                }
              );

    }

    

 
}
