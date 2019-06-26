"use strict";

  angular
    .module('app.controllers')
    .controller('employerCtrl', employerCtrl);

function employerCtrl($scope, $state, $location, apiCall)
{
    var employer = this;

    employer.login = empLogin;
    employer.register = empRegister;
    employer.forgotPass = empForgotPass;
    employer.changePword = changePword;
    employer.deleteemp = deleteemp;
    var $employerData = sessionStorage.getItem('employerinfo');

    switch($state.current.name)
    {
        case "Employer":
            if($employerData)
            {
                $location.path('Employer/Dashboard');
            }
            else if(!$employerData)
            {
                $location.path('Employer/Login');
            }
            break;
        case "empLogin":
        case "empRegister":
        case "empForgotPass":
            break;
        case "empSetting":
        case "jobpost":
            if(!$employerData)
            {
                $location.path('Employer/Login');
            }
            break;
        case "Posted":
            if($employerData)
            {
            Applied();
            }
            else if(!$employerData)
            {
                $location.path('Employer/Login');
            }
            break;
        case "empProfile":
            if($employerData)
            {
            empProfile();
            }
            else if(!$employerData)
            {
                $location.path('Employer/Login');
            }
            break;
        case "empDashboard":
            if($employerData)
            {
            empDashboard();
            }
            else if(!$employerData)
            {
                $location.path('Employer/Login');
            }
            break;
        default:
            $location.path('404')
            break;
    }

    function empLogin()
    {

    }

    function empRegister()
    {

    }


    function empForgotPass()
    {
        
    }


    function Dashboard()
    {
        // apiCall
        // .get(
        //     'accounts/username/'+$userData.username, 
        //     function(response)
        //     {
        //         employer.data = response.data.output.response;
        //     }
        //  );
    }


    function Applied()
    {

    }


    function Profile()
    {

    }


    function changePword()
    {

    }
    function deleteemp()
    {

    }
}
