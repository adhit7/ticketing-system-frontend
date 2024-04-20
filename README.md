# Ticketing System Frontend

Ticketing System Frontend is MERN project with the realtime chatting functionality from socket.io.<br >
Backend repo - https://github.com/adhit7/ticketing-system-backend<br >

# Userflow(Three role based functionalities)
1.Admin:<br >
  -Create a batch, learner and mentor.<br >
  -Assigning mentor toward their batch queries from the learner<br >
  -Can know what are all the conversation is happening and also can close the query with the solution<br >

2.Learner:<br >
  -Create a query.<br >
  -Can chat with the their batch mentor once the query is assigned from admin and also close the query with the solution<br >

3.Mentor:<br >
  -Chat with the learner query that is assigned from admin towards the mentor and also close the query with the solution<br >

# Example
Admin: (To get into admin route, you have to just remove other login route names and add <b>/admin/login</b> at end of the url)<br >
-Email: admin@gmail.com <br >
-password: 12345 <br >



## Local Setup

```sh
$ git clone https://github.com/adhit7/ticketing-system-frontend.git
```

```sh
$ cd ticketing-system-frontend
```

```sh
$ npm install
```

```sh
$ npm start
```
