'use client';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useDeferredValue, useMemo, useReducer } from 'react';
import useFetchList, { Place } from '../swr/useFetchList';
import CircularLoader from '../components/CircularLoader/CircularLoader';

export type initialState = {
  city: string;
  state: string;
  country: string;
}

function reducer(state: initialState, action: { type: string, value: string }) {
  switch (action.type) {
    case 'changed_city': {
      return {
        ...state,
        city: action.value
      };
    }
    case 'changed_state': {
      return {
        ...state,
        state: action.value
      };
    }
    case 'changed_country': {
      return {
        ...state,
        country: action.value
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export default function Page() {
  const router = useRouter();
  const [state, dispatch] = useReducer(
    reducer,
    {
      city: '',
      state: '',
      country: '',
    }
  );
  const deferredState = useDeferredValue(state);

  const requiredInfo = useMemo(() => ([
    {
      id: 'city',
      label: 'Enter your City Name',
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'changed_city', value: e.target.value }),
      value: deferredState.city,
      required: true
    },
    {
      id: 'state',
      label: 'Enter your State Code',
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'changed_state', value: e.target.value }),
      value: deferredState.state,
      required: false
    },
    {
      id: 'country',
      label: 'Enter your Country Code',
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch({ type: 'changed_country', value: e.target.value }),
      value: deferredState.country,
      required: false
    },
  ]), [deferredState])

  const { info, isLoading, isError } = useFetchList(deferredState);
  const cityList = useMemo(() => {
    if (!info) return {};
    return info.reduce((acc, curr, index) => {
      acc[index.toString()] = curr;
      return acc;
    }, {} as { [key: string]: Place })
  }, [info]);

  return (
    <Container>
      <Typography variant="h4" mb={2}>Weather in your city</Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        <Stack direction="column" spacing={1} sx={{ width: { xs: '100%', md: '30%' } }}>
          {
            requiredInfo.map((i) => (
              <TextField
                key={i.id}
                id="outlined-basic"
                label={i.label}
                variant="filled"
                value={i.value}
                onChange={i.onChange}
                required={i.required}
              />
            ))
          }
        </Stack>
        <TableContainer component={Paper} sx={{ width: { xs: '100%', md: '70%' } }}>
          {
            isLoading ? (
              <CircularLoader />
            ) : (
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">Country</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.values(cityList).length
                      ? (Object.values(cityList).map((place) => (
                        <TableRow
                          key={place.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': {
                              cursor: 'pointer'
                            }
                          }}
                          onClick={() => router.push(`/city?name=${place.name}&lat=${place.lat}&lon=${place.lon}`)}
                        >
                          <TableCell component="th" scope="row">
                            {place.name}
                          </TableCell>
                          <TableCell align="right">{place.state}</TableCell>
                          <TableCell align="right">{place.country}</TableCell>
                        </TableRow>
                      ))) : (
                        <TableRow>
                          <TableCell align="center" colSpan={3}>
                            Sorry, we do not have matching country.
                          </TableCell>
                        </TableRow>
                      )
                  }
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
      </Stack>
    </Container>
  )
}
