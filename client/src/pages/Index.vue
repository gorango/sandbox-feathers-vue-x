<template lang="pug">
  q-page.row
    .col-grow.relative
      .absolute.fit.scroll
        .max-w-lg.mx-auto.py-16
          template(v-for='n in 2')
            p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod, augue sit amet porttitor interdum, ex nulla ornare sem, vel ultricies magna dolor nec neque. Ut sollicitudin dignissim iaculis. Ut hendrerit sapien ut porttitor porta. Praesent ut eros in nibh laoreet interdum vel et risus. Mauris accumsan vitae odio et lacinia. Fusce et eros urna. Ut ut tincidunt ex. In hac habitasse platea dictumst. Proin nec tortor vel nisl congue molestie. Pellentesque convallis turpis id est efficitur molestie. Morbi tempus egestas congue.
            p Aenean magna mi, porttitor quis ante et, viverra interdum justo. Proin in placerat purus. Sed luctus nec orci et euismod. Sed ornare lacinia justo. Pellentesque varius eros lorem, id blandit ipsum iaculis sed. Duis eleifend elementum quam vitae consequat. Proin quis ultrices erat, non ultricies elit. Suspendisse quis velit odio. Vivamus nibh sem, porttitor nec mi eu, suscipit condimentum nisl. Quisque posuere magna ut ipsum ultrices, non sagittis metus mattis. Etiam feugiat urna quis neque tincidunt semper. Donec dapibus lectus diam, feugiat elementum felis condimentum ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean vulputate elementum ex, in dapibus justo varius quis. Etiam varius tortor magna, quis auctor est viverra eget. Cras convallis urna ac erat molestie, id tincidunt nulla porttitor.
            p Ut vitae lectus ut mauris consectetur viverra. Cras tristique ante a quam ullamcorper, tincidunt ultrices orci feugiat. Nunc fringilla quam ut orci rhoncus, volutpat tristique neque condimentum. Vestibulum porttitor pulvinar suscipit. Nam est nisl, efficitur at lectus at, ultrices pharetra felis. Phasellus nisi mauris, fermentum eget augue fermentum, luctus convallis sapien. Phasellus fringilla est sed egestas vestibulum. Pellentesque tempor arcu vel est fermentum sagittis. Duis mattis et orci quis iaculis. Donec sollicitudin vestibulum urna, eu scelerisque elit bibendum sed. Integer vehicula felis risus, vel posuere augue consectetur ut. Aenean ut nisi nec odio feugiat ultricies vel nec leo.
            p Mauris nec arcu eget magna suscipit aliquam nec a metus. Praesent a tellus consequat, laoreet libero quis, tristique felis. Vivamus euismod suscipit dapibus. Curabitur vel justo eget ligula iaculis pharetra at sed massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras hendrerit tellus turpis, sed mollis lorem luctus vitae. Nulla sed sodales ipsum. Etiam iaculis, libero eget laoreet malesuada, orci quam sollicitudin eros, in rhoncus erat tortor convallis erat. Donec ut dapibus ex.
            p Suspendisse tristique magna a urna sollicitudin faucibus. Donec ut arcu sem. Nulla pulvinar lectus ut enim accumsan, et ullamcorper est rhoncus. Vivamus a tempor massa. Etiam vel vestibulum nisi. Donec ut diam mollis, tincidunt lorem ac, tincidunt dui. Pellentesque nec mauris dolor. Morbi porta lacus ut erat pretium scelerisque. Aenean molestie placerat nisi, sit amet sollicitudin turpis suscipit ac. Vestibulum et vehicula libero, at mollis lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur vulputate gravida libero eu facilisis. Pellentesque orci dolor, pulvinar non convallis id, commodo vel risus. Etiam semper, est vitae tristique dictum, velit orci ultricies dui, ac iaculis ex dolor eu risus.
</template>

<script>
import {meta} from '@/meta'

export default {
  name: 'IndexPage',

  meta: {
    title: meta.title,
    meta: {
      description: {
        name: 'description',
        content: meta.description
      }
    }
  },
}
</script>
