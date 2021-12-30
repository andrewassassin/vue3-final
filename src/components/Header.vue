<template>
    <header class="header">

    </header>
</template>
<script>
export default {

}
</script>
<style scoped>
.header{
    width: 100%;
    height: 600px;
    background-image: url("../assets/img/header1.jpg");
    background-position: center;
    background-attachment:fixed;
    background-size: cover;
    background-repeat:no-repeat;
}

@media(max-width:600px){
    .header{
        height: 400px;
    }
}
</style>