<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.css">
    <style type="text/css">
        body {
            padding-top: 40px;
        }
    </style>
</head>
<body>
    <div id="app" class="container">
        @include('projects.list')

        <form method="POST" action="/projects" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
            @csrf

            <div class="field">
                <label for="name" class="label">Project Name:</label>

                <p class="control">
                    <input type="text" id="name" name="name" class="input" v-model="form.name">
                </p>

                <p class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></p>
            </div>

            <div class="field">
                <label for="description" class="label">Project Description:</label>

                <p class="control">
                    <input type="text" name="description" id="description" class="input" v-model="form.description">
                </p>

                <p class="help is-danger" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></p>
            </div>

            <p class="control">
                <button class="button is-primary" :class="form.loading ? 'is-loading' : ''" :disabled="form.errors.any()">Create</button>
            </p>
        </form>
    </div>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/vue@2.3.0/dist/vue.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>