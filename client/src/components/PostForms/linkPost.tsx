import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_LINK } from '../utils/mutations';
import { QUERY_LINKS } from '../utils/queries';

import Auth from '../utils/auth';

const Collection = () => {
  const [linkForm, setLinkForm] = useState({ title: '', url: '' });

  const [addLink, { error }] = useMutation
    (ADD_LINK, {
      refetchQueries: [ QUERY_LINKS, 'getLinks' ]
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addLink({
        variables: { input:{}}
      });
    }
  };

};

export default Collection;