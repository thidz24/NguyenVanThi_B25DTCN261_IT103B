let songs = JSON.parse(localStorage.getItem('songs')) || [];
function addSong(e) {
    e.preventDefault();
    const titleInputElement = document.getElementById('title');
    const artistInputElement = document.getElementById('artist');
    const title = titleInputElement.value.trim();
    const artist = artistInputElement.value.trim();
    if (title === '' || artist === '') {
        alert('Vui lòng nhập đầy đủ thông tin bài hát.');
        return;
    } else {
        const newSong = {
            title: title,
            artist: artist,
            id: songs.length > 0 ? songs[songs.length - 1].id + 1 : 1
        };
        songs.push(newSong);
        localStorage.setItem('songs', JSON.stringify(songs));
        titleInputElement.value = '';
        artistInputElement.value = '';
        renderSongs(songs);
    }
}
function renderSongs(songs) {
    let songListElement = document.getElementById('songList');
    songs.forEach(song => {
        songListElement.innerHTML += `<tr>
            <td>${song.id}</td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td><button onclick="deleteSong(${song.id})">Xóa</button><button onclick="fixSong(${song.id})">Sửa</button></td>
        </tr>`;

    });
}
function deleteSong(id) {
    songs = songs.filter(song => song.id !== id);
    localStorage.setItem('songs', JSON.stringify(songs));
    renderSongs(songs);
}
function fixSong(id) {
    const song = songs.find(song => song.id === id);
    if (song) {
        const newTitle = prompt('Nhập tên bài hát mới:', song.title);
        const newArtist = prompt('Nhập tên nghệ sĩ mới:', song.artist);
        if (newTitle !== null && newArtist !== null) {
            song.title = newTitle.trim();
            song.artist = newArtist.trim();
            localStorage.setItem('songs', JSON.stringify(songs));
            renderSongs(songs);
        }
    }
}