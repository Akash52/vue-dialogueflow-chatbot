<template>
  <div class="chatbox">
    <div class="messages">
      <div
        class="message"
        v-for="(message, index) in messages"
        :key="index"
        :class="{ user: message.isUser, agent: !message.isUser }"
      >
        {{ message.text }}
      </div>
    </div>
    <div class="input">
      <input type="text" v-model="message" @keydown.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      message: ''
    }
  },
  methods: {
    async sendMessage() {
      const url = 'http://localhost:3000/query'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: this.message })
      })
      const json = await response.json()
      const newMessage = { text: this.message, isUser: true }
      this.messages.push(newMessage)
      const agentMessage = { text: json.response, isUser: false }
      this.messages.push(agentMessage)
      this.message = ''
    }
  }
}
</script>

<style scoped>
.chatbox {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 10px;
}

.messages {
  display: flex;
  flex-direction: column;
}

.message {
  display: inline-block;
  max-width: 70%;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.user {
  align-self: flex-start;
  background-color: #f2f2f2;
}

.agent {
  align-self: flex-end;
  background-color: #4caf50;
  color: #fff;
}
.input {
  display: flex;
  margin-top: 10px;
}

.input input {
  flex: 1;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
}

.input button {
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
