import { user } from '../Models/user.model.js';
import bycrpt from 'bcrypt';
const SignUpUser = async (req, res) => {
  // const { first, last, email, Password, ConfirmPassword } = req.body;
  // console.log('data Send By  User In backend is ', req.body);

  try {
    let userExexited = await user.findOne({ email });
    // console.log('Check exestince of the user is ', userExexited);
    console.log(
      'Check that password is  same as Confirm Password',
      Password === ConfirmPassword
    );
    if (Password != ConfirmPassword) {
      return res.json(400).json({
        message: ' Same as Password ',
      });
    }

    const hasedPassword = await bycrpt.hash(Password, 10);
    // console.log(hasedPassword);
    if (!userExexited) {
      const User = new user({
        firstname: first,
        lstname: last,
        email: email,
        password: hasedPassword,
      });
      // console.log(' user is created inside db is ', User);
      const result = await User.save();
      return res.status(200).json({
        message: result,
      });
    } else {
      return res.status(401).json({
        message: 'User is Already Execited',
      });
    }
  } catch (error) {
    return res.status(400).json({
      details: error.details,
      message: 'SomeThing Went wrong ',
    });
  }
};
const SignInUser = async (req, res) => {
  return res.status(201).json({
    message: 'All  Are okk  With My SignUp User controller ',
  });
};
export { SignUpUser, SignInUser };
