
const song = { name: 'Dying to live', artist: 'Tupac', featuring: 'Biggie Smalls' };

d = document.createElement('div');
$(d).addClass("song")
    .html(`<p> ${song.name} - ${song.artist} (${song.featuring})</p>`)
    .appendTo($("#myDiv")) //main div

