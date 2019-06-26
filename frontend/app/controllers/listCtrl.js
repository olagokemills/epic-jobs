"use strict";

  angular
    .module('app.controllers')
    .controller('listCtrl', listCtrl);

function listCtrl($scope, $state, $location, apiCall, $rootScope)
{
    var list = this;
    list.apply = apply;

    list.succMsg = "";

    switch($state.current.name)
    {
        case "listing":
             apiCall
         .get(
           'jobs', 
            function(response)
            {
                list.data = response.data.output.response;
            }
          );
            break;

        case "listingCategory":
            apiCall
             .get(
               'jobs/category/'+$state.params.Category, 
                function(response)
                {
                    list.data = response.data.output.response;
                }
              );         
            break;

        case "listingDetails":
            list.data = {};
            apiCall
             .get(
               'jobs/title/'+$state.params.Details, 
                function(response)
                {
                    list.data['details'] = {} = response.data.output.response[0];

                }
              ); 
            break;

        default:
            $location.path('404')
            break;
    }

  /*  function checkApplied(){
        if($rootScope.userinfo)
        {
            apiCall
                .get(
                    'accounts/applied/authid/'+$rootScope.userinfo.authid,
                    
                    function(response){

                        list.data['applied'] = {} = response.data.output.response;

                        if( list.data['applied']['jobid']){

                        }

                        console.info(list.data['applied']);
                    }
                );
        }
        else
        {
            return false;
        }
    }
  */ 
    function apply()
    {
      
      var appliedOn = new Date();

      appliedOn = appliedOn.toUTCString();

     if(!$rootScope.userinfo)
        {
            $location.path('Account/Login');
        }else
        {
          apiCall
         .post(
            'jobs/applied',
            {
             
             title:list.data['details']['title'],
             jobid:list.data['details']['id'],
             company:list.data['details']['company'], 
             postedon:list.data['details']['postedon'], 
             jobtype:list.data['details']['jobtype'],
             location:list.data['details']['location'], 
             salary:list.data['details']['salary'], 
             level:list.data['details']['level'],
             description:list.data['details']['description'],
             function:list.data['details']['function'],
             postedby:list.data['details']['postedby'],
             appliedon:appliedOn, 
             username: $rootScope.userinfo.username,
           },
        function(response)
            {   
                apiCall
                    .post(
                    'email/notify',
                    {
                        email: 'ola@almondcareers.com',
                        sender: 'Epic Portal',
                        reciepient: $rootScope.userinfo.email, 
                        subject: 'Application Acknowledged',
                        message: '<h2> Epic Jobs Recruitment Portal </h2><p>You have successfully Applied to a job from '+ list.data['details']['company'] 
                                 +' on our platform, you will be contacted shortly</p>',

                    },
                      function(alertresponse)
                    {   
                      apiCall
                        .post(
                            'email/notify',
                    {
                         email: 'ola@almondcareers.com',
                        sender: 'Epic jOBs Recruitment Portal',
                        reciepient: 'ola@almondcareers.com', 
                        subject: 'Application Sent',
                        message: '<h2> Epic Jobs Recruitment Portal </h2><p>A seeker has applied to a job from '+ list.data['details']['company'] 
                                 +' on your platform, Check your dashboard for details</p>',
                    },
                    function(emailresponse)
                    {
                        list.succMsg = 'Applied Successfully'; 
                        setTimeout(function(){ window.location = 'Account/Dashboard'}, 2000);
                    }
                );
            }
         );
       }

       );
    }

}

}


