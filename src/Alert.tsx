import { useEffect, useState } from 'react';

type Props = {
  alertType: alerttype;
  children: React.ReactNode;
  duration?: number;
};

type alerttype = 'danger' | 'success' | 'notification';

export const Alert = ({ children, alertType, duration }: Props) => {
  const [visible, setVisible] = useState<boolean | null>(true);
  let classname;
  if (alertType == 'danger') {
    classname = 'danger';
  } else if (alertType == 'success') {
    classname = 'success';
  } else if (alertType == 'notification') {
    classname = 'notification';
  } else classname = '';

  const handleClose = () => {
    if (visible) {
      setVisible(() => false);
    }
  };

  useEffect(() => {
    if (duration !== undefined && duration !== 0) {
      setTimeout(() => {
        setVisible(() => false);
      }, duration);
    }
  }, []);

  return (
    <>
      {visible && (
        <div className={classname}>
          <button onClick={handleClose}>X</button>
          {children}
        </div>
      )}
    </>
  );
};
