import { useState, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};
export function ContactPageTwo() {
  //   const [contact, setContact] = useState<Contact>({
  //     name: '',
  //     email: '',
  //     notes: '',
  //     reason: '',
  //   });
  const { register, handleSubmit, formState } = useForm<Contact>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const navigate = useNavigate();
  const fieldStyle = 'flex flex-col mb-2';

  const onSubmit = (contact: Contact) => {
    console.log('Submitted details:', contact);
    navigate(`/success/${contact.name}`);
  };

  return (
    <div
      className="flex flex-col py-10 max-w-md 
    mx-auto"
    >
      <h2
        className="text-3xl font-bold underline 
    mb-3"
      >
        Contact Us
      </h2>
      <p className="mb-3">If you enter your details we will get back to you as soon as we can</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is Required' })}
            // value={contact.name}
            className="border solid black "
            // onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
          {errors.name && <div className="text-red-500">{errors.name.message}</div>}
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Your email address</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is Required' })}
            // value={contact.email}
            className="border solid black "
            // onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        </div>

        <div className={fieldStyle}>
          <label htmlFor="reason">Reason you need to contact us</label>
          <select
            id="reason"
            className="border solid black "
            {...register('reason', { required: 'reason is required' })}
            // value={contact.reason}
            // onChange={(e) => setContact({ ...contact, reason: e.target.value })}
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
          {errors.reason && <div className="text-red-500">{errors.reason.message}</div>}
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea
            id="notes"
            className="border solid black "
            {...register('notes')}
            // value={contact.notes}
            // onChange={(e) => setContact({ ...contact, notes: e.target.value })}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-10 px-6 font-semibold bg-black 
 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
