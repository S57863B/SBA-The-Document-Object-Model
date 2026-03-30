SBA: The Document Object Model

Project Description
This is a client-side only personal blog and journal application. It allows users to quickly write their thoughts, publish them, edit existing entries, and delete unwanted posts. The application operates entirely within the browser and utilizes localStorage for data persistence.

Reflection on the Development Process:
I started by setting up the basic visual layout of the page, then styled it to look like a modern dark theme, and finally wrote the JavaScript to make the buttons and forms actually work.

Challenges Faced & Solutions

The Problem: When I created a new post, the "Edit" and "Delete" buttons wouldn't work at first.
The Solution: Instead of trying to add a click event to every single button, I added one main click event to the big container that holds all the posts. Now, when I click anywhere inside that container, the code checks if I clicked a specific button and runs the right function.

The Problem: I only had one form, but I needed it to do two things: create brand new posts AND save updates to old posts.
The Solution: I added a hidden input field to the form. When I click "Edit" on an existing post, its unique ID is secretly copied into this hidden field. When I click "Publish", the code checks that hidden field.
If there's an ID inside, it updates the old post. If it's empty, it creates a new one.

Known Issues and Future Features:
It would be great to add a search bar to find posts when the list gets long.