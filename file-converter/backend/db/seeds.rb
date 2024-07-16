# db/seeds.rb

# Clear existing data
Blog.destroy_all

# Generate example blog records
blogs = [
  {
    title: "Understanding Ruby on Rails",
    description: "This blog post delves into the core concepts of Ruby on Rails, including its MVC architecture, Active Record, and RESTful design. It’s a great starting point for beginners.",
    author: "John Doe"
  },
  {
    title: "JavaScript: The Definitive Guide",
    description: "In this comprehensive guide, we explore the ins and outs of JavaScript, from its basic syntax to advanced concepts like closures and event delegation.",
    author: "Jane Smith"
  },
  {
    title: "A Deep Dive into React Hooks",
    description: "React Hooks have revolutionized the way we write React applications. This post covers useState, useEffect, and custom hooks to help you write cleaner and more efficient code.",
    author: "Alice Johnson"
  },
  {
    title: "Building RESTful APIs with Node.js",
    description: "Learn how to build robust and scalable RESTful APIs using Node.js and Express. This tutorial covers everything from setting up the environment to deploying your API.",
    author: "Bob Brown"
  },
  {
    title: "Mastering CSS Grid Layout",
    description: "CSS Grid Layout is a powerful tool for creating flexible and responsive web layouts. This post walks you through the basics and provides practical examples to help you get started.",
    author: "Emily Davis"
  }
]

# Create blog records
blogs.each do |blog|
  Blog.create!(blog)
end

puts "Seeded #{Blog.count} blogs."
