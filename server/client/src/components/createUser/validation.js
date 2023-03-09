export default function Validate(values, users) {
    //phone validation expression
    //const validEmail = new RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$', 'gm');
    //const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const validEmail = /^.+@[^\.].*\.[a-z]{2,}$/;
    //const validPhone = new RegExp('^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$', 'gm');
    const validPhone = /^[2-9]\d{2}-\d{3}-\d{4}$/;

    let errors = {
        ...(!values.name) && { name: 'Name is required' },
        ...(values.name && values.name.length < 3) && { name: 'Please make sure your name is at least 3 characters long' },
        ...(users.some(user => user.name === values.name)) && { name: 'This name appears to already be in use' },
        ...(!values.email) && { email: 'Email is required' },
        ...(!validEmail.test(values.email)) && { email: 'Invalid email address' },
        ...(users.some(user => user.email === values.email)) && { email: 'This email appears to already be in use' },
        ...(!validPhone.test(values.phone)) && { phone: 'Phone needs to be in the format of: 000-000-0000' },
        ...(!values.ctrlPassword) && { ctrlPassword: 'Password is required' }, 
        ...(values.ctrlPassword && values.ctrlPassword.length < 4) && { ctrlPassword: 'Password needs to be at least 4 characters' },
        ...(!values.password) && { password: 'Please confirm your password' },
        ...(values.password !== values.ctrlPassword) && { password: 'Passwords must match' },
    };
    console.log(errors);
    return errors;
};