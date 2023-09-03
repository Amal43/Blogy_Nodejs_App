let id = localStorage.getItem('blogId');
console.log(id);
fetch(`http://localhost:3000/Blog/${id}`).then(res => {
    res.json().then(data => {
        console.log(data);
        document.getElementById('title').value = data.title;
        document.getElementById('id').innerHTML = data._id;
    })
})

function updateData(event) {
    event.preventDefault();
    console.log('update function');
    let form = document.getElementById('updateForm');
    let formData = new FormData(form);
    let id = document.getElementById('id').innerHTML;
    console.log(id);
    fetch(`http://localhost:3000/Blog/update/${id}`, {
        method: 'PUT',
        body: formData
    }).then(res => {
        res.json().then(data => {
            console.log(data);
            if (data.success) {
                window.location.href = data.redirectUrl;
            }
        })
    })
}