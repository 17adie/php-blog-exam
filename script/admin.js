const server_url = "http://localhost/php-blog-exam/"
const form = document.getElementById("blogForm")

const app = {
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
    blog: function (title, content, cb) {
      const params = {
        _title: title,
        _content: content,
      }
      app.api_request("api/admin/add_blog", params, function (response) {
        cb(response)
      })
    },
  },
}

// form
form.addEventListener("submit", function (event) {
  event.preventDefault()

  const title = $("#blogTitle").val().trim()
  const content = $("#blogContent").val().trim()

  console.log(title, content)

  // validations
  // check empty values
  if (title.length == 0 || content.length == 0) {
    alert("Please fill out all required fields.")
    return
  }

  // add blog
  app.add.blog(title, content, function (resp) {
    console.log({ resp })
    if (resp.status) {
      alert(resp.message)
      location.reload();
    } else {
      console.log(resp)
      alert(resp.message)
    }
  })
})
