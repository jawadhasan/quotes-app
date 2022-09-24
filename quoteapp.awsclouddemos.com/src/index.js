import 'regenerator-runtime/runtime'

import 'bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
// import './resources/bootstrap.united.css';
import './resources/bootstrap.pulse.min';


// import another component
import main from './main';

//jquery and jquery-ui
import "./import-jquery.js";

import makeAjaxRequest from "./ajaxService.js";

import ko from "knockout";

// Import all plugins
import * as bootstrap from 'bootstrap';

// Or import only needed plugins
//import { Tooltip as Tooltip, Toast as Toast, Popover as Popover } from 'bootstrap';

main();


var demoApp = function () {
   var pageTitle = 'Quotes App';
   var selectedQuote= ko.observable(null);
 
   function getRandomQuote(){

     makeAjaxRequest('GET', "https://dpulxf8ib9.execute-api.eu-central-1.amazonaws.com/Prod/quotes/", null)
            .done(function (data) {
                console.log(data);
                selectedQuote(data);
            }).fail(function (e) {            
                console.log(e);              
            });
   }
 
 
   return {
     pageTitle: pageTitle,
     selectedQuote:selectedQuote,
     getRandomQuote:getRandomQuote   
   }
 
 }();

$(function() {

   console.log('ready called');
   let elem = document.getElementById("indexPage");
   ko.applyBindings(demoApp, elem);
   demoApp.getRandomQuote();//first load



   $("#btnRefresh").on('click', (e) => {   
    demoApp.getRandomQuote();   
  });


    //timer
    setInterval(
      ()=>{
        demoApp.getRandomQuote();
      },12*1000
    );

  });