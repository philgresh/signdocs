```js
{
  entities: {
    chirps: {
      1: {
        id: 1,
        body: "bluebirds like blueberries",
        authorId: 11,
        likerIds: [11,25],
      },
      2: {
        id: 2,
        body: "bluebirds also like blue potatoes",
        authorId: 25,
        likerIds: [],
      },
      3: {
        id: 3,
        body: "bluebirds are more like fruit",
        authorId: 11,
        likerIds: [25],
      }
    },
    users: {
      11: {
        id: 11,
        username: "blue_macaw",
        authoredChirpIds: [1, 3],
        likedChirpIds: [1],       
      },
      25: {
        id: 25,
        username: "blue_toucan",
        authoredChirpIds: [2],
        imgUrl: "https://cdn.pixabay.com/photo/2015/10/01/16/43/toucan-967334_960_720.jpg"
        likedChirpIds: [1,3], 
      }
    },
  },
  ui: {
    loading: true/false
  },
  errors: {
    login: ["Incorrect username/password combination"],
    chirpForm: ["Chirp body cannot be blank"],
  },
  session: { currentUserId: 25 }
}
```