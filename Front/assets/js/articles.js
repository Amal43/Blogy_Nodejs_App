let input, hashtagArray, container, t;
input = document.querySelector('#tags');
container = document.querySelector('.tag-container');
hashtagArray = [];

input.addEventListener('keyup', (event) => {
    if (event.which == 13 && input.value.length > 0) {
        hashtagArray.push(input.value); // Add the tag to the array
        var text = document.createTextNode(input.value);
        var p = document.createElement('p');
        container.appendChild(p);
        p.appendChild(text);
        p.classList.add('tag');
        input.value = '';

        let deleteTags = document.querySelectorAll('.tag');

        for (let i = 0; i < deleteTags.length; i++) {
            deleteTags[i].addEventListener('click', () => {
                container.removeChild(deleteTags[i]);
                hashtagArray.splice(i, 1); // Remove the tag from the array
                console.log(hashtagArray); // Optional: Log the updated array
            });
        }
    }
});

function addBlog(event) {
event.preventDefault();
let form = document.getElementById('addForm');
let formData = new FormData(form);

// Remove empty tags from the hashtagArray and append them individually
hashtagArray.forEach(tag => {
        formData.append('tags[]', tag.trim());
});

// Check if any input value (except tags) is empty before submitting the form
let inputs = form.querySelectorAll('input[type="text"], textarea');
let isEmpty = false;

inputs.forEach(input => {
    if (input !== document.querySelector('#tags') && input.value.trim() === '') {
        isEmpty = true;
        input.classList.add('error');
    } else {
        input.classList.remove('error');
    }
});

if (isEmpty) {
    return; // Stop form submission if any input (except tags) is empty
}

fetch(`http://localhost:3000/Blog/addblog`, {
    method: 'POST',
    body: formData
}).then(res => {
    res.json().then(data => {
        console.log(data);
        if (data.success) {
            window.location.href = data.redirectUrl;
        }
    });
});
}