// Make connection
var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


// Emit events
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        date: Date.now()
    });
    message.value = "";
});

this.addEventListener('keyup', function(event) {
    if (event.keyCode === 13 && checkMessageEmpty(message.value) == false) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value,
            date: Date.now()
        });
        message.value = "";
    }
})

function checkMessageEmpty(msg) {

    var regex = /^\s*$/;
    if (msg.match(regex)) {
        return true;
    } else {
        return false;
    }
}

message.addEventListener('keyup', function() {
    socket.emit('typing', handle.value);
})

let timeout = null;
socket.on('typing', function(data) {
    clearTimeout(timeout);
    feedback.innerHTML = '<p><em>' + data + ' est entrain d\'écrire...</em></p>';
    timeout = setTimeout(function() {
        feedback.innerHTML = '<p></p>';
    }, 4000);

});

socket.on('chat', function(data) {
    feedback.innerHTML = '';
    getMessages(data);

});

function getMessages(data) {
    output.innerHTML += '<div class="msgbloc"><p><strong>' + data.handle + '</strong><p1>' + checkDateTime(data.date) + '</p1></p><pm>' + data.message + '</pm></div>';
    output.scrollTop = output.scrollHeight;
}

function checkDateTime(data) {
    // Messages datant de plus de 1 jour, affichage a modifier
    const today = {
        hour: "2-digit",
        minute: "2-digit"
    };
    const yesterday = {
        hour: "2-digit",
        minute: "2-digit"
    };
    const year = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    };

    var date = new Date(data).toLocaleTimeString("fr-FR", today);

    return date;

};