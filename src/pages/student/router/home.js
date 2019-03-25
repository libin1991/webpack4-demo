const PrivateClasses = () => import('@stu/views/home/private-classes');
console.log(PrivateClasses);

export default [
  {
    path: '/',
    component: PrivateClasses,
  },
];
