'use strict';
/*
 * Create a a separate Vue -- uncconected to the DOM
 * to listen to
 */
import Vue from 'vue';
var LogBus = new Vue();


// This is the function that generates an appender function
function VueLogBusAppender(layout, timezoneOffset) {
    
    // Define a Vue if LogBus DNE
    if (typeof LogBus !== 'undefined' ) {
        LogBus = new Vue();
    }   
    
    // This is the appender function itself
    const appender = (loggingEvent) => {
        // emit the log message
        // use log level as emit channel
        LogBus.$emit(loggingEvent.level.levelStr, `${layout(loggingEvent, timezoneOffset)}\n`);
    };

    // add a shutdown function.
    appender.shutdown = (done) => {
        // do nothing
    };

    return appender;
}

function configure(config, layouts) {
  let layout = layouts.colouredLayout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return VueLogBusAppender(layout, config.timezoneOffset);
}

export {configure};
