import { useState, FormEvent } from 'react';
import { Form, ActionFunctionArgs, redirect } from 'react-router-dom';

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};
export function ContactPage() {
  //   const [contact, setContact] = useState<Contact>({
  //     name: '',
  //     email: '',
  //     notes: '',
  //     reason: '',
  //   });

  const fieldStyle = 'flex flex-col mb-2';
  //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const contact = {
  //       name: formData.get('name'),
  //       email: formData.get('email'),
  //       reason: formData.get('reason'),
  //       notes: formData.get('notes'),
  //     } as Contact;
  //     console.log('submitted details: ', contact);
  //     // setContact({
  //     //   name: '',
  //     //   email: '',
  //     //   notes: '',
  //     //   reason: '',
  //     // });
  //   };

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
      <Form method="post">
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            // value={contact.name}
            className="border solid black "
            // onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Your email address</label>
          <input
            type="email"
            id="email"
            name="email"
            // value={contact.email}
            className="border solid black "
            // onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="reason">Reason you need to contact us</label>
          <select
            id="reason"
            className="border solid black "
            name="reason"
            // value={contact.reason}
            // onChange={(e) => setContact({ ...contact, reason: e.target.value })}
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea
            id="notes"
            className="border solid black "
            name="notes"
            // value={contact.notes}
            // onChange={(e) => setContact({ ...contact, notes: e.target.value })}
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-2 h-10 px-6 font-semibold bg-black 
 text-white"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
export const ContactPageAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  return redirect(`/success/${formData.get('name')}`);
};
