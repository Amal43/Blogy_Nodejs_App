fetch('http://localhost:3000/User/getallblog').then(res=>
{
    res.json().then(data=>
    {
      console.log(data)
        data.forEach(element => {
            document.getElementById('has-scrollbar').innerHTML+=` <li class="scrollbar-item">
      <div class="blog-card">

        <figure class="card-banner img-holder" style="--width: 500; --height: 600;">
          <img src=${element.img} loading="lazy" alt="New technology is not good or evil in and of itself" class="img-cover" width="500" height="600">

          <ul class="avatar-list absolute">

            <li class="avatar-item">
              <a href="#" class="avatar img-holder" style="--width: 100; --height: 100;">
                <img src=${element.img}  loading="lazy" alt="Author" class="img-cover" width="100" height="100">
              </a>
            </li>

            <li class="avatar-item">
              <a href="#" class="avatar img-holder" style="--width: 100; --height: 100;">
                <img src=${element.img} loading="lazy" alt="Author" class="img-cover" width="100" height="100">
              </a>
            </li>

          </ul>
        </figure>

        <div class="card-content">

          <ul class="card-meta-list">

            <li>
              <a href="#" class="card-tag">#Design</a>
            </li>

            <li>
              <a href="#" class="card-tag">#Idea</a>
            </li>

            <li>
              <a href="#" class="card-tag">#Review</a>
            </li>

          </ul>
          <h2>${element.author.username}</h2>
          <h3 class="h4">
            <a href="#" class="card-title hover-underline">
              ${element.title}
            </a>
          </h3>

          <p class="card-text">
            ${element.description}
          </p>

        </div>

      </div>
    </li> `
        });
    })
})
fetch('http://localhost:3000/User/getallblog').then(res=>
{
    res.json().then(data=>
    {
      console.log(data)
        data.forEach(element => {
            document.getElementById('grid-list').innerHTML+=` <li class="scrollbar-item">
      <div class="blog-card">

        <figure class="card-banner img-holder" style="--width: 500; --height: 600;">
          <img src=${element.img} loading="lazy" alt="New technology is not good or evil in and of itself" class="img-cover" width="500" height="600">

          <ul class="avatar-list absolute">

            <li class="avatar-item">
              <a href="#" class="avatar img-holder" style="--width: 100; --height: 100;">
                <img src=${element.img}  loading="lazy" alt="Author" class="img-cover" width="100" height="100">
              </a>
            </li>

            <li class="avatar-item">
              <a href="#" class="avatar img-holder" style="--width: 100; --height: 100;">
                <img src=${element.img} loading="lazy" alt="Author" class="img-cover" width="100" height="100">
              </a>
            </li>

          </ul>
        </figure>

        <div class="card-content">

          <ul class="card-meta-list">

            <li>
              <a href="#" class="card-tag">#Design</a>
            </li>

            <li>
              <a href="#" class="card-tag">#Idea</a>
            </li>

            <li>
              <a href="#" class="card-tag">#Review</a>
            </li>

          </ul>
          <h2>${element.author.username}</h2>
          <h3 class="h4">
            <a href="#" class="card-title hover-underline">
              ${element.title}
            </a>
          </h3>

          <p class="card-text">
            ${element.description}
          </p>

        </div>

      </div>
    </li> `
        });
    })
})