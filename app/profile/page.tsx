import FormContainer from '@/components/form/FormContainer';
import {
  updateProfileAction,
  fetchProfile,
  updateProfileImageAction,
} from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import ImageInputContainer from '@/components/form/ImageInputContainer';

async function UserDataPanel() {
  const userData = await fetchProfile();

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        Account Details
      </h1>
      <div className='border p-8 rounded-md '>
        <ImageInputContainer
          image={userData.profileImage}
          name={userData.username}
          action={updateProfileImageAction}
          text='Modify Display Picture'
        />
        <FormContainer action={updateProfileAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput
              type='text'
              name='firstName'
              label='First Name'
              defaultValue={userData.firstName}
            />
            <FormInput
              type='text'
              name='lastName'
              label='Last Name'
              defaultValue={userData.lastName}
            />
            <FormInput
              type='text'
              name='username'
              label='Username'
              defaultValue={userData.username}
            />
          </div>
          <SubmitButton text='Save Modifications' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default UserDataPanel;