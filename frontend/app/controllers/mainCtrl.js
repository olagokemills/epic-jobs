"use strict";

  angular
    .module('app.controllers', [])
    .controller('mainCtrl', mainCtrl);

function mainCtrl($scope, $state, $location, apiCall)
{
    var main = this; 

    main.data = {};

    // main.ticket = Ticket;
    // main.faq = faq;
    // main.contact = contact;
    
 switch($state.current.name)
    {
        case "Home":
         apiCall
             .get(
               'jobs', 
                function(response)
                {
                    main.data['jobs'] = {}= response.data.output.response;
                }
              );

             getCompany();
             getSeekers();
            break;
        case "Ticket":
            break;
        case "faq":
            break;
        case "Contact Us":
              $location.path('Contact');
            break;
        default:
            $location.path('404')
            break;
    }

    function getCompany()
    {
        apiCall
             .get(
               'jobs/company', 
                function(response)
                {
                    main.data['company'] = response.data.output.response;
                }
              );

    }


    function getSeekers()
    {
        apiCall
             .get(
               'accounts', 
                function(response)
                {
                    main.data['seekers'] = response.data.output.response;
                }
              );

    }

 
}
