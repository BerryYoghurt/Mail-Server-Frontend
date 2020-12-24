<template>
  <div id="signup" class="d-flex align-items-center justify-content-center container" style="min-height: 30vh">
    <div class="w-100" style="max-width: 800px">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <h3 class="text-truncate bg-gradient card-title col-10" data-bs-toggle="tooltip" data-bs-placement="bottom" :title="email.subject">{{email.subject}}
              <span class=" badge bg-danger" v-if="email.priority==3">Critical</span>
              <span class=" badge bg-warning text-dark" v-else-if="email.priority==2">Important</span>
              <span class=" badge bg-primary" v-else-if="email.priority==1">Normal</span>

            </h3>
          </div>
          <div class="card-subtitle text-muted">
            <div class="row">
              <h4 class="col"><span class="badge round-pill bg-secondary">{{email.sender}}</span></h4>
              <div class="col text-end">{{email.date}}</div>
            </div>
          </div>
          <br>
          <div id="email-body">{{email.bodyText}}</div>
          <br>

          <div class="dropdown text-center" v-if="email.attachments.length">
            <button class="btn btn-secondary dropdown-toggle col-6" id="attachments-button" data-bs-toggle="dropdown">Attachments</button>
            <ul class="dropdown-menu">
              <li v-for="(attachment, index) in email.attachments" :key="index"><a class="dropdown-item" @click="downloadAttachment(attachment)">{{attachment}}</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name: "ViewMailNew",
    setup(props) {
      const email = JSON.parse(props.emailString);
      function downloadAttachment(attachment) {
        window.open(encodeURI(`http://localhost:8086/download?emailId=${email.id}&fileName=${attachment}`));
      }
      return {
        email,
        downloadAttachment
      }
    },
    props: {
      emailString: String
    }
}
</script>