const server_url = "http://localhost/php-blog-exam/"

const public = {
  api_request: (api, params, cb) => {
    $.ajax({
      url: server_url + api + ".php",
      data: {
        params,
      },
      method: "POST",
      dataType: "json",
      crossDomain: true,
      timeout: 50000,

      success: function (response) {
        return cb(response)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR)
        console.log(textStatus)
        console.log(errorThrown)
      },
    })
  },
  add: {
    comment: function (title, content, cb) {
      const params = {
        _title: title,
        _content: content,
      }
      public.api_request("api/admin/add_blog", params, function (response) {
        cb(response)
      })
    },
  },
  display: {
    blog: function () {
      public.api_request("api/public/get_blog", null, function (resp) {
        console.log(resp)
        const blogContainer = document.getElementById("blogContainer")
        const blogPost = resp.map((v) => {
          return `<div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${v.title}</h5>
              <p class="card-text">${v.content}</p>
              <a href="views/viewPost.html?id=${v.id}" >View Post</a>
            </div>
          </div>
        </div>`
        })

        // Appending generated HTML to the blogContainer
        blogContainer.innerHTML = blogPost.join("")
      })
    },
  },
}

public.display.blog()
