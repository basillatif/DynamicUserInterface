$(() => {
    let $log = $(".event-log");
    let logEvent = (message) => {
        $log.text($log.text() + message + "\n")
            .scrollTop($log[0].scrollHeight - $log.height());
    };
    
    $(".swivel-this").swivel({
        change: function (oldAngle, newAngle) {
            logEvent("Swivel: Swiveled from " + oldAngle + " to " + newAngle);
        }
    });
});
