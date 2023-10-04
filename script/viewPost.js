const server_url = "http://localhost/php-blog-exam/"
const form = document.getElementById("commentForm")

// Get the id parameter from the URL
const urlParams = new URLSearchParams(window.location.search)
const postId = urlParams.get("id")

const view_post = {
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
  display: {
    post: function () {
      const params = {
        _id: postId,
      }
      view_post.api_request("api/public/get_post", params, function (response) {
        const value = response[0]
        // display value
        $("#title").text(value.title)
        $("#content").text(value.content)
      })
    },
    comments: function () {
      const params = {
        _id: postId,
      }
      view_post.api_request("api/public/get_comments", params, function (resp) {
        console.log(resp)
        const commentContainer = document.getElementById("commentContainer")
        // Format date using Moment.js
        const commentList = resp.map((v) => {
          const formattedCreatedAt = moment(v.createdAt).format("MMMM Do YYYY, h:mm a")

          return `<div class="card text-dark">
          <div class="card-body p-4">
            <div class="d-flex flex-start">
              <div>
                <h6 class="fw-bold mb-1">Anonymous</h6>
                <div class="d-flex align-items-center mb-3">
                  <p class="mb-0">
                    ${formattedCreatedAt} 
                  </p>
                </div>
                <p class="mb-0">
                  ${v.comment}
                </p>
              </div>
            </div>
          </div>
        </div>`
        })

        // Appending generated HTML to the blogContainer
        commentContainer.innerHTML = commentList.join("")
      })
    },
  },
  add: {
    comment: function (comment, cb) {
      const params = {
        _comment: comment,
        _post_id: postId,
      }
      console.log(params)
      view_post.api_request("api/public/add_comment", params, function (response) {
        console.log(response)
        cb(response)
      })
    },
  },
}

// initialize
view_post.display.post()
view_post.display.comments()

// form
form.addEventListener("submit", function (event) {
  event.preventDefault()

  const comment = $("#addComment").val().trim()

  console.log(comment)

  // check empty values
  if (comment.length == 0) {
    alert("Please enter comment.")
    return
  }

  // add comment
  view_post.add.comment(comment, function (resp) {
    console.log({ resp })
    if (resp.status) {
      alert(resp.message)
      location.reload()
    } else {
      console.log(resp)
      alert(resp.message)
    }
  })
})
