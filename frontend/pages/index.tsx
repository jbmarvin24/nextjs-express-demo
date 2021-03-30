import { Box, Heading, Link, ListItem, OrderedList, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Stack spacing={3} alignItems="center" mt={50}>
      <Heading as="h1" size="2xl">
        Full Stack Next JS and Express
      </Heading>
      <Text mb={5} fontSize="3xl">
        with{' '}
        <Link color="teal.500" href="https://chakra-ui.com/" isExternal>
          Chakra UI
        </Link>{' '}
        and{' '}
        <Link fontWeight="semibold" href="https://www.prisma.io/" isExternal>
          Prisma 2
        </Link>
      </Text>
      <Box w="35%" p={6} borderWidth="1px" borderRadius="lg" borderColor="gray.300">
        <Heading as="h3" size="lg">
          <NextLink href="/employees">
            <Link>Employees &#x27A3;</Link>
          </NextLink>
        </Heading>
        <Text mt={3} fontSize="md">
          Next JS and Express Demo w/ Prisma 2 ORM with MySQL Database.
        </Text>
      </Box>
      <Text as="i" pt={10}>
        References
      </Text>
      <Link href="https://www.youtube.com/watch?v=a7JigiLw_OY" isExternal>
        SWR and Axios
      </Link>
      <Text as="i" pt={5}>
        Exercise
      </Text>
      <OrderedList>
        <ListItem>Authentication w/ JWT</ListItem>
        <ListItem>Pagination</ListItem>
        <ListItem>For Charles: File Uploading</ListItem>
      </OrderedList>
    </Stack>
  );
}
