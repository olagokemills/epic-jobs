"use strict";

angular
    .module('ngApp', ['ui.router', 'ngSanitize', 'app.controllers', 'app.services'])
    .config(configuration)
    .constant('baseurl', '//epicjobs.theclip.com.ng/frontend/')
    .constant('apiurl', '//lesscard.tk/backend3/')
    .constant('filepath', '//recruitmentportalpm-michelle.tk/model/uploads/')
    .run(run);
    
    run.$inject = ['$state', '$rootScope', 'baseurl'];

function run($state, $rootScope, baseurl)
{
    $rootScope.baseurl = baseurl;

    $rootScope.$on('$locationChangeSuccess', function () 
        {
            if(sessionStorage.getItem('accountinfo') !== null)
            {
                $rootScope.userinfo = JSON.parse(sessionStorage.getItem('accountinfo'));
            }
        }
    )
}

function configuration($stateProvider, $urlRouterProvider, $locationProvider)
{
    // pages / angular states
    $urlRouterProvider.otherwise('/404');
    $stateProvider
        .state({
            name: 'Home',
            url: '/',
            templateUrl: 'app/view/Home.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        })
        .state({
            name: 'Contact',
            url: '/Contact',
            templateUrl: 'app/view/contact.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        })
        .state({
            name: 'listing',
            url: '/Listing',
            templateUrl: 'app/view/joblist.html',
            controller: 'listCtrl',
            controllerAs: 'list'
        })
        .state({
            name: 'listingCategory',
            url: '/Listing/:Category',
            templateUrl: 'app/view/listing/Category.html',
            controller: 'listCtrl',
            controllerAs: 'list'
        })
        .state({
            name: 'listingDetails',
            url: '/Listing/:Category/:Details',
            templateUrl: 'app/view/listing/Details.html',
            controller: 'listCtrl',
            controllerAs: 'list'
        })
        .state({
            name: 'Account',
            url: '/Account',
            controller: 'accountsCtrl',
            controllerAs: 'accounts'
        })
        .state({
            name: 'acctLogin',
            url: '/Account/Login',
            templateUrl: 'app/view/Account/login.html',
            controller: 'accountsCtrl',
            controllerAs: 'accounts'
        })
        .state({
            name: 'acctRegister',
            url: '/Account/Register',
            templateUrl: 'app/view/Account/register.html',
            controller: 'accountsCtrl',
            controllerAs: 'accounts'
        })
        .state({
            name: 'acctForgotPass',
            url: '/Account/Forgot-Password',
            templateUrl: 'app/view/Account/forgotpassword.html',
            controller: 'accountsCtrl',
            controllerAs: 'accounts'
        })
        .state({
            name: 'Applied',
            url: '/Account/Applied',
            templateUrl: 'app/view/Account/applied.html',
            controller: 'accountsCtrl',
            controllerAs: 'accounts'
        })
        .state({
            name: 'Delete',
            url: '/Account/Delete',
            templateUrl: 'app/view/Account/delete.html',
            controller: 'accountsCtrl',
            controllerAs: 'accounts' 

       })
        .state({
            name: 'acctDashboard',
            url: '/Account/Dashboard',
            templateUrl: 'app/view/Account/dashboard.html',
            controller: 'accountsCtrl',
            controllerAs: 'accounts'
        })
        .state({
            name: 'editProfile',
            url: '/Account/EditProfile',
            templateUrl: 'app/view/Account/editprofile.html',
            controller: 'accountsCtrl',
            controllerAs: 'accounts'
        })
        .state({
            name: 'Error',
            url: '/404',
            templateUrl: 'app/view/404.html',
        });;
        
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}


function cutString(text, len)
{    
    text = $($.parseHTML(text)).text();
    var i = 0;
    var wordsToCut = len;
    var wordsArray = text.split(" ");
    if(wordsArray.length>wordsToCut){
        var strShort = "";
        for(i = 0; i < wordsToCut; i++){
            strShort += wordsArray[i] + " ";
        }   
        return strShort+"...";
    }else{
        return text;
    }
 }


// this transforms any form data into proper encoding for ajax communication
function transformRequest(obj)
{
    var $res = [];
    for(var key in obj)
    {
        $res.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return $res.join('&');
}