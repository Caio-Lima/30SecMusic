  function buscador()
  {
     var desc = document.getElementById('descricao');

     if(desc.style.visibility!="visible")
         desc.style.visibility="visible";

     var templateSource = document.getElementById('results-template').innerHTML,
     template = Handlebars.compile(templateSource),
     resultsPlaceholder = document.getElementById('results'),
     playingCssClass = 'playing',
     audioObject = null;

     var fetchTracks = function (albumId, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            success: function (response) {
                callback(response);
            }
        });
    };

    var searchAlbums = function (query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album'
            },
            success: function (response) {
                resultsPlaceholder.innerHTML = template(response);
            }
        });
    };

    results.addEventListener('click', function(e) {
        var target = e.target;
        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                audioObject.pause();
            } else {
                if (audioObject) {
                    audioObject.pause();
                }
                fetchTracks(target.getAttribute('data-album-id'), function(data) {            
                    audioObject = new Audio(data.tracks.items[0].preview_url);
                    audioObject.play();
                    target.classList.add(playingCssClass);
                    audioObject.addEventListener('ended', function() {
                        target.classList.remove(playingCssClass);
                    });
                    audioObject.addEventListener('pause', function() {
                        target.classList.remove(playingCssClass);
                    });
                });
            }
        }
    });

    document.getElementById('search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        searchAlbums(document.getElementById('query').value);
    }, false);
}


(function () {
    var audio = new Audio();

    function searchTracks(query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
                if (response.tracks.items.length) {
                    var track = response.tracks.items[0];
                    audio.src = track.preview_url;
                    audio.play();
                    communicateAction('<div>Tocando ' + track.name + ' por ' + track.artists[0].name + '</div><img width="150" class="img-rounded" src="' + track.album.images[1].url + '">');
                    notifyMe(track.album.images[1].url,track.name,track.artists[0].name);
                }
            }
        });
    }

    function playSong(songName, artistName) {
        var query = songName;
        if (artistName) {
            query += ' artist:' + artistName;
        }

        searchTracks(query);
    }

    function communicateAction(text) {
        var rec = document.getElementById('conversation');
        rec.innerHTML += '<div class="action">' + text + '</div>';
    }

    function recognized(text) {
        var rec = document.getElementById('conversation');
        rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';

    }
    if (annyang) {

        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
            'stop': function () {
                audio.pause();
                recognized('Você parou a reprodução');
                NotifyStop();
            }, 
            'search *song': function (song) {
                document.getElementById("query").value=song;
                document.getElementById("query").focus();
                scrollTo('textSearch');
                recognized('Você procurou por '+song);
            }, 
            'speaks': function () {
                scrollTo('speaks');
            },    
            'play track *song': function (song) {
                scrollTo("conversation");
                recognized('Tocar Música ' + song);
                playSong(song);
            }, 
            'play *song by *artist': function (song, artist) {
                scrollTo("conversation");
                recognized('Tocando ' + song + ' por ' + artist);
                playSong(song, artist);
            },

            'play song *song': function (song) {
                scrollTo('conversation');
                recognized('Tocar Música' + song);
                playSong(song);
            },
            'play *song': function (song) {
                scrollTo("conversation");
                recognized('Tocar ' + song);
                playSong(song);

            },
            'About': function () {
                scrollTo('about');
                communicateAction('Você foi até Sobre-Nós.');
            },
            'Home': function () {
                scrollTo('home');
                communicateAction('Você foi até o começo.');
            },       
            ':nomatch': function (message) {
                scrollTo("conversation");
                recognized(message);
                communicateAction('Me desculpe não consegui entender.');
                NotifyMessage(message);
            }


        };


        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();

    }

    annyang.addCallback('error', function () {
        communicateAction('Erro verifique se outra página não esta tentando usar o microfone');
    });
})();

function scrollTo(hash) {
    location.hash = "#" + hash;
}

document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(Album,musica,Autor) {
  if (!Notification) {
    return;
}

if (Notification.permission !== "granted")
    Notification.requestPermission();
else {
    var notification = new Notification('30SecMusic', {
      icon: Album,
      body: "Tocando "+musica +" por " + Autor,
  });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
  };

}

}

function NotifyStop() {
  if (!Notification) {
    return;
}

if (Notification.permission !== "granted")
    Notification.requestPermission();
else {
    var notification = new Notification('30SecMusic', {
      icon: 'estilo/img/pause.png',
      body: "Você parou a reprodução"
  });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
  };

}

}

function NotifyMessage(msg) {
  if (!Notification) {
    return;
}

if (Notification.permission !== "granted")
    Notification.requestPermission();
else {
    var notification = new Notification('30SecMusic', {
      icon: 'estilo/img/question.png',
      body: "Você disse "+ msg +" ?"
  });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
  };

}

}