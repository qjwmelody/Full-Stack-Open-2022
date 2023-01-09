describe("Blog app", () => {
    beforeEach(function () {
      const user = { name: "name", username: "user", password: "password" }
  
      cy.request("POST", "http://localhost:3003/api/testing/reset")
      cy.request("POST", "http://localhost:3003/api/users", user)
      cy.visit("http://localhost:3000")
    })
  
    it("Login form is shown", function () {
      cy.get("h2").contains("log into application")
      cy.get(".login-username").should("be.visible")
      cy.get(".login-password").should("be.visible")
      cy.get(".login-submit-btn")
    })
  
    describe("Login", function () {
      it("succeeds with correct credentials", function () {
        cy.login({ username: "user", password: "password" })
  
        cy.get("#page-header").contains("blogs")
        cy.get("#create-new-header").contains("create new")
      })
  
      it("fails with wrong credentials", function () {
        cy.get(".login-username").type("user")
        cy.get(".login-password").type("wrongpass")
        cy.get(".login-submit-btn").click()
  
        cy.contains("invalid username or password")
      })
    })
  
    describe("When logged in", function () {
      const newBlog = { title: "Title", author: "Author", url: "url.com" }
  
      beforeEach(function () {
        cy.login({ username: "user", password: "password" })
      })
  
      it("A blog can be created", function () {
        cy.createBlog(newBlog)
        cy.get(".blog-title").should("have.text", newBlog.title)
        cy.get(".blog-author").should("have.text", newBlog.author)
        cy.contains("view").click()
        cy.get(".blog-url").should("have.text", newBlog.url)
      })
  
      it("Users can like a blog", function () {
        cy.createBlog(newBlog)
        cy.contains("view").click()
        cy.get(".like-btn").click()
        cy.get(".blog-likes").should("have.text", "likes 1")
      })
  
      it("Users that created blog can delete it", function () {
        cy.createBlog(newBlog)
        cy.contains("view").click()
        cy.get(".remove-btn").click()
  
        cy.get(".blog-title").should("not.exist")
        cy.get(".blog-author").should("not.exist")
        cy.get(".blog-url").should("not.exist")
      })
  
      it.only("Blogs ordered according to likes", function () {
        const secondBlog = {
          title: "Most liked",
          author: "Good author",
          url: "win.com",
        }
        cy.createBlog(newBlog)
        cy.contains("view").click()
        for (let i = 0; i < 5; i++) {
          cy.get(".like-btn").click()
        }
        cy.reload()
  
        cy.createBlog(secondBlog)
        cy.reload()
        cy.get(".blog-ctn").eq(1).contains("view").click()
        for (let i = 0; i < 15; i++) {
          cy.get(".like-btn").eq(1).click()
        }
  
        cy.reload()
  
        cy.get(".blog-ctn").eq(0).contains("view").click()
        cy.get(".blog-title").eq(0).should("have.text", secondBlog.title)
        cy.get(".blog-author").eq(0).should("have.text", secondBlog.author)
        cy.get(".blog-url").eq(0).should("have.text", secondBlog.url)
        cy.get(".blog-likes").eq(0).should("have.text", "likes 15")
      })
    })
  })