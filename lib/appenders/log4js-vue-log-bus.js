'use strict';
/*
 * Create a a separate Vue -- uncconected to the DOM
 * to listen to
 */
import Vue from 'vue';

// var LogBus = new Vue();
// this clones it. It does not reference
// window.LogBus = LogBus;
window.LogBus = new Vue();

// This is the function that generates an appender function
function VueLogBusAppender(layout, timezoneOffset) {

    // Define a Vue if LogBus DNE
//     if (typeof LogBus !== 'undefined' ) {
//         LogBus = new Vue();
//     }

    // This is the appender function itself
    const appender = (loggingEvent) => {

        // use log level as default emit channel
        let channelName = loggingEvent.level.levelStr;

        // Pre-append category name if not default category:level
        if( loggingEvent.categoryName != 'default' ) {
            channelName = loggingEvent.categoryName+':'+channelName;
        }

        // emit the log message
        window.LogBus.$emit(channelName, `${layout(loggingEvent, timezoneOffset)}\n`);
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
