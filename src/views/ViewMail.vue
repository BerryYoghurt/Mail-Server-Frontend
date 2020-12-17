<template>
  <div class="container-fluid">
    <div class = "row-sm border">
      <button class = "btn btn-primary">Back</button>
      <!--context specific buttons-->
      <button class = "btn btn-primary">Delete</button>
    </div>
    <div class = "row border">
      <!--metadata-->
      <div class = "col-sm-3 border px-0 mx-0">
        <ul class = "list-group">
          <li class = "card">
            <div class = "row mx-0">
              <div class = "col-sm-4 border">
                Subject
              </div>

              <input class = "col-sm-8 border" type = "text" value = "My Subject" disabled = true>
            </div>
          </li>
          <li class = "card">
            <div class = "row mx-0">
              <div class = "col-sm-4 border">
                From
              </div>
              <div class = "col-sm-8 border">
                Sender
              </div>
            </div>
          </li>
          <li class = "card">
            <div class = "row mx-0">
              <div class = "col-sm-4 border">
                Date
              </div>
              <div class = "col-sm-8 border">
                20/20
              </div>
            </div>
          </li>
          <li class = "card">
            <div class = "row mx-0">
              <div class = "col-sm-4 border">
                Priority
              </div>
              <div class = "col-sm-8 border">
                Normal
              </div>
            </div>
          </li>
          <li class = "card">
            <div class="card-title">Receivers</div>
            <div class = "card-body">
              <ul class = "list-group">
                <li class = "list-item">
                  receiver1
                </li>
                <li class = "list-item">
                  receiver2
                </li>
                <li class = "list-item">
                  receiver3
                </li>
              </ul>
            </div>

          </li>
        </ul>

      </div>
      <!--email-->
      <div class = "col-sm-9 border">
        <div>Text</div>
        <hr>
        <div class = "float-left">
          <h6>Attachment(s)</h6>
          <ul class = "list-group list-group-horizontal">
            <li class = "card list-group-item">
              Attachment1
            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ViewMail"
}
</script>

<!-- no need for <style> because bootstrap takes care of it.. probably-->