# KAVIOSPix

## Project Overview
KAVIOSPix is a photo management application that allows users to securely manage and organize their photos. Users can create albums, upload and manage images, add tags and comments, mark images as favorites, and share albums with other users.

---

## Demo Link

[Live Demo](https://kaviospix-frontend-two.vercel.app/login)

---

## Quick Start

```
git clone https://github.com/Subhransu894/Kaviospix-frontend
cd <your-repo>
npm install 
npm run dev
```
---

## Tech stack

### Frontend
- React.js
- Vite
- React-Router
- Bootstrap
- Bootstrap Icons
- Javascript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Google OAuth
- Multer
- Cloudinary
- bcrypt

### Deployement
- Render
- Vrecel
- Cloudinary

---

## Demo Video

Watch a walkthrough of all major features of this app: [Loom Vide](https://www.loom.com/share/89a04d8bf2ac4b5f82c479ed52113ed5)

---


## Features

### Authentication
- User authentication using Google OAuth.
- JWT-based authentication for protected API requests.

### Album Management
- Create new albums with name and description.
- View all available albums.
- Search albums by name or description.
- Edit album details.
- Delete albums.
- Share albums with other registered uers.

### Image Management
- Upload images to a specific album.
- View images inside an albm.
- Edit image name, tags, and person information.
- Mark images as favorites.
- Delete images.
- View images in larger preview.
- Add comments to images.

### User Experience
- Responsive UI using Bootstrap.
- Toast notifications for success, warning, and error messages.
- Confirmation before deleting albums or images.

---

## API Reference

### **POST /auth/register**
Register a new user.
Sample Response:
```
{
  "message": "User created successfully",
  "user": {
    "userId": "...",
    "email": "user@example.com"
  }
}
```

### **POST /auth/login**
Login an existing user using email and password
Sample Response:
```
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

### **POST /auth/login**
Authenticate users using Google OAuth.

## Albums
### **GET /albums**
Get all albums accessible to the authenticated user.
Sample Respnose:
```
{
  "albums": [...]
}
```

### **POST /albums**
Create a new album.
Sample Response:
```
{
  "message": "Album created successfully",
  "album": {
    "albumId": "...",
    "name": "...",
    "description": "..."
  }
}
```

### **PUT /albums/:albumId**
Update an existing album.
Sample Response:
```
{
  "message": "Album updated successfully",
  "album": {
    "albumId": "...",
    "name": ".....",
    "description": "......"
  }
}
```

### **DELETE /albums/:albumId**
Delete an album.
Sample Response:
```
{
  "message": "Album deleted successfully"
}
```

### **POST /albums/:albumId/share**
Share an album with another registered user.
Sample Response:
```
{
  "message": "Album shared successfully"
}
``` 

## Images

### **GET /images?albumId=:albumId**
Get all images from a specific album.
Sample Response:
```
{
  "images": [...]
}
```

### **POST /images**
Upload an image to an album.
Sample Response:
```
{
  "message": "Image uploaded successfully",
  "image": {
    "imageId": "...",
    "name": "...",
    "imageUrl": "..."
  }
}
```

### **PUT /images/:imageId**
Update image details such as name, tags, person, favorite status, and comments.
Sample Response:
```
{
  "message": "Image updated successfully",
  "image": {
    "imageId": "...",
    "name": "...",
    "tags": [],
    "person": "...",
    "isFavorite": false
  }
}
```

### **DELETE /images/:imageId**
Delete an image.
Sample Response:
```
{
  "message": "Image deleted successfully"
}
```

## Users
### **GET /users**
Get all registered users.
Sample Response:
```
{
  "users": [
    {
      "userId": "...",
      "email": "user@example.com"
    }
  ]
}
```

## Contact
For bugs and features request, please reach out to subhransusekhar790@gmail.com