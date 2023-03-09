export default function Validate(values, users) {
    //phone validation expression
    //const validEmail = new RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$', 'gm');
    const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    //const validPhone = new RegExp('^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$', 'gm');
    const validPhone = /^[2-9]\d{2}-\d{3}-\d{4}$/;
    //const validFile = /(\.jpg|\.jpeg|\.png)$/i;

    let errors = {
        ...((values.email) && (!validEmail.test(values.email))) && { email: 'Invalid email address' },
        ...((values.email) && (users.some(user => user.email === values.email))) && { email: 'This email appears to already be in use' },
        ...((values.phone) && (!validPhone.test(values.phone))) && { phone: 'Phone needs to be in the format of: 000-000-0000' },
        ...(values.ctrlPassword && values.ctrlPassword.length < 4) && { ctrlPassword: 'Password needs to be at least 4 characters' },
        ...((values.ctrlPassword) && (!values.password)) && { password: 'Please confirm your password' },
        ...((values.password) && (values.password !== values.ctrlPassword)) && { password: 'Passwords must match' },
    };
    console.log(errors);
    return errors;
};