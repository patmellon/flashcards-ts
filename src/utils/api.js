module.exports = {
  getCardData() {
    return fetch("data").then(response => response.json());
  },

  addCard(card) {
    return fetch("/api/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        card
      })
    }).then(response => response.json());
  },

  updateNotes(newCardCollection) {
    return fetch("/api/update", {
      method: "put",
      body: JSON.stringify(newCardCollection),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }
};
