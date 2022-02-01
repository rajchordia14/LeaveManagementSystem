toc.dat                                                                                             0000600 0004000 0002000 00000013226 14176235532 0014453 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                           z            Leave_Manage    14.0    14.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                    1262    16404    Leave_Manage    DATABASE     j   CREATE DATABASE "Leave_Manage" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE "Leave_Manage";
                postgres    false         �            1259    16415    application    TABLE     �   CREATE TABLE public.application (
    type text,
    s_date date,
    e_date date,
    numdays integer,
    remarks text,
    fid text
);
    DROP TABLE public.application;
       public         heap    postgres    false         �            1259    16410    director    TABLE     m   CREATE TABLE public.director (
    fac_name text,
    start_date text,
    end_date text,
    remark text
);
    DROP TABLE public.director;
       public         heap    postgres    false         �            1259    16787    holidays    TABLE     1   CREATE TABLE public.holidays (
    dates date
);
    DROP TABLE public.holidays;
       public         heap    postgres    false         �            1259    16428    leaves    TABLE     �   CREATE TABLE public.leaves (
    fid text NOT NULL,
    cl bigint NOT NULL,
    pl bigint NOT NULL,
    sl bigint NOT NULL,
    dl bigint NOT NULL
);
    DROP TABLE public.leaves;
       public         heap    postgres    false         �            1259    16420    login    TABLE     �   CREATE TABLE public.login (
    staff_id text NOT NULL,
    name text NOT NULL,
    role "char" NOT NULL,
    dept text,
    password text DEFAULT 12345678 NOT NULL
);
    DROP TABLE public.login;
       public         heap    postgres    false         �            1259    16405 
   login_data    TABLE     U   CREATE TABLE public.login_data (
    name text,
    email text,
    password text
);
    DROP TABLE public.login_data;
       public         heap    postgres    false         �            1259    16445    record    TABLE     �  CREATE TABLE public.record (
    fid text NOT NULL,
    type text NOT NULL,
    "user" text,
    s_date date NOT NULL,
    e_date date NOT NULL,
    reason text,
    "rembyHOD" text,
    "rembyDOFA" text,
    rembydir text,
    status "char" NOT NULL,
    numdays integer NOT NULL,
    "recbyHOD" boolean,
    "recbyDOFA" boolean,
    auth "char",
    role "char" NOT NULL,
    dept text NOT NULL
);
    DROP TABLE public.record;
       public         heap    postgres    false                   0    16415    application 
   TABLE DATA           R   COPY public.application (type, s_date, e_date, numdays, remarks, fid) FROM stdin;
    public          postgres    false    211       3336.dat           0    16410    director 
   TABLE DATA           J   COPY public.director (fac_name, start_date, end_date, remark) FROM stdin;
    public          postgres    false    210       3335.dat           0    16787    holidays 
   TABLE DATA           )   COPY public.holidays (dates) FROM stdin;
    public          postgres    false    215       3340.dat 
          0    16428    leaves 
   TABLE DATA           5   COPY public.leaves (fid, cl, pl, sl, dl) FROM stdin;
    public          postgres    false    213       3338.dat 	          0    16420    login 
   TABLE DATA           E   COPY public.login (staff_id, name, role, dept, password) FROM stdin;
    public          postgres    false    212       3337.dat           0    16405 
   login_data 
   TABLE DATA           ;   COPY public.login_data (name, email, password) FROM stdin;
    public          postgres    false    209       3334.dat           0    16445    record 
   TABLE DATA           �   COPY public.record (fid, type, "user", s_date, e_date, reason, "rembyHOD", "rembyDOFA", rembydir, status, numdays, "recbyHOD", "recbyDOFA", auth, role, dept) FROM stdin;
    public          postgres    false    214       3339.dat u           2606    16426    login login_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (staff_id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public            postgres    false    212         w           2606    16434 	   leaves pk 
   CONSTRAINT     H   ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT pk PRIMARY KEY (fid);
 3   ALTER TABLE ONLY public.leaves DROP CONSTRAINT pk;
       public            postgres    false    213         y           2606    16774    record pk_record 
   CONSTRAINT     m   ALTER TABLE ONLY public.record
    ADD CONSTRAINT pk_record PRIMARY KEY (fid, type, s_date, e_date, status);
 :   ALTER TABLE ONLY public.record DROP CONSTRAINT pk_record;
       public            postgres    false    214    214    214    214    214         z           2606    16435 	   leaves fk    FK CONSTRAINT     j   ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT fk FOREIGN KEY (fid) REFERENCES public.login(staff_id);
 3   ALTER TABLE ONLY public.leaves DROP CONSTRAINT fk;
       public          postgres    false    213    3189    212                                                                                                                                                                                                                                                                                                                                                                                  3336.dat                                                                                            0000600 0004000 0002000 00000006134 14176235532 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        Firefox	2021-11-10	2021-11-14	4	sick	\N
Chrome	2021-11-11	2021-12-02	21	fever	\N
Internet Explorer	2021-11-10	2021-11-13	3	sick	\N
Chrome	2021-11-11	2021-12-23	42	sick	\N
2	2021-11-20	2021-11-28	8	sick	\N
2	2021-11-20	2021-11-27	7	sick	\N
On Duty Leave	2021-11-25	2021-12-11	16	sick	\N
Previledge Leave	2021-11-21	2021-12-05	14	fever	\N
Speacial Leave	2021-11-20	2021-11-28	8	sick	\N
Speacial Leave	2021-11-25	2021-12-01	6	fever	\N
Speacial Leave	2021-11-25	2021-12-01	6	fever	\N
Speacial Leave	2021-11-16	2021-11-20	4	sick	\N
Speacial Leave	2021-11-16	2021-11-20	4	sick	\N
Speacial Leave	2021-11-06	2021-11-15	9	sick	\N
Speacial Leave	2021-11-06	2021-11-15	9	sick	\N
Speacial Leave	2021-11-06	2021-11-15	9	sick	\N
Speacial Leave	2021-11-30	2021-12-05	5	sick	\N
Speacial Leave	2021-11-30	2021-12-05	5	sick	\N
Speacial Leave	2021-11-16	2021-11-26	10	sick	\N
Speacial Leave	2021-11-16	2021-11-26	10	sick	\N
Speacial Leave	2021-11-14	2021-11-20	6	sick	\N
Speacial Leave	2021-11-14	2021-11-20	6	sick	\N
Speacial Leave	2021-11-20	2021-12-02	12	sick	\N
Speacial Leave	2021-11-20	2021-12-02	12	sick	\N
Speacial Leave	2021-11-14	2021-11-17	3	sick	\N
Speacial Leave	2021-11-21	2021-11-25	4	sick	\N
Speacial Leave	2021-11-21	2021-11-25	4	sick	\N
Speacial Leave	2021-11-14	2021-11-17	3	sick	\N
Speacial Leave	2021-11-26	2021-11-27	1	sick	\N
Speacial Leave	2021-11-26	2021-11-27	1	sick	\N
Speacial Leave	2021-11-19	2021-11-25	6	sick	\N
Speacial Leave	2021-11-19	2021-11-25	6	sick	\N
Speacial Leave	2021-11-05	2021-11-27	22	ppp	\N
Speacial Leave	2021-11-06	2021-11-19	13	gahh	\N
On Duty Leave	2021-11-06	2021-11-19	13	gahh	\N
Previledge Leave	2021-11-20	2021-11-22	2	eeeee	\N
Previledge Leave	2021-11-20	2021-11-22	2	eeeee	\N
Casual Leave	2021-11-14	2021-11-28	14	feeling sick	\N
Previledge Leave	2021-11-18	2021-11-25	7	fever	\N
Previledge Leave	2021-11-18	2021-11-26	8	fever	\N
Previledge Leave	2021-11-18	2021-11-25	7	fas	\N
Previledge Leave	2021-11-18	2021-11-25	7	fas	\N
On Duty Leave	2021-11-26	2021-11-27	1	fever	\N
Casual Leave	2021-11-19	2021-11-25	6	ppp	\N
Casual Leave	2021-11-19	2021-11-25	6	ppp	\N
Casual Leave	2021-11-27	2021-12-03	6	ppp	\N
Casual Leave	2021-11-27	2021-12-03	6	ppp	\N
Casual Leave	2021-11-19	2021-11-24	5	jnd	\N
Casual Leave	2021-11-19	2021-11-24	5	jnd	\N
Casual Leave	2021-11-17	2021-12-01	14	jnd	\N
Casual Leave	2021-11-26	2021-12-12	16	gahh	\N
On Duty Leave	2021-11-19	2021-11-28	9	gahh	\N
On Duty Leave	2021-11-28	2021-12-12	14	ooawf	\N
Previledge Leave	2021-11-19	2021-11-24	5	gahh	\N
Previledge Leave	2021-11-26	2021-11-28	2	fever	\N
Previledge Leave	2021-11-26	2021-11-28	2	fever	\N
Casual Leave	2021-11-18	2021-11-27	9	fever	\N
On Duty Leave	2021-11-28	2021-12-11	13	fever	\N
Casual Leave	2021-11-27	2021-12-04	7	ooawf	\N
Casual Leave	2021-11-12	2021-12-04	22	fever	m@lnmiit
Casual Leave	2021-11-28	2021-12-09	11	jnd	raj@lnmiit
Casual Leave	2021-12-03	2022-01-09	37	gahh	raj@lnmiit
Previledge Leave	2021-11-18	2021-11-26	8	sick	e@lnmiit
Previledge Leave	2021-11-17	2021-11-28	11	sick	e@lnmiit
Casual Leave	2021-11-17	2021-11-24	7	sick	raj@lnmiit
Casual Leave	2021-11-13	2021-12-01	18	sick	
Casual Leave	2021-11-19	2021-11-26	7	DOFA	
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                    3335.dat                                                                                            0000600 0004000 0002000 00000000350 14176235532 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        raj	08/11/2021	09/11/2021	sick
aviina	08/11/2021	09/11/2021	sick
abc	08/11/2021	09/11/2021	sick
fasdf	08/11/2021	09/11/2021	sick
aviina	08/11/2021	09/11/2021	sick
abc	08/11/2021	09/11/2021	sick
fasdf	08/11/2021	09/11/2021	sick
\.


                                                                                                                                                                                                                                                                                        3340.dat                                                                                            0000600 0004000 0002000 00000000367 14176235532 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2021-12-25
2022-01-14
2022-01-26
2022-03-28
2022-04-02
2022-04-14
2022-04-21
2022-04-25
2022-05-14
2022-05-26
2022-07-21
2022-08-15
2022-08-19
2022-08-22
2022-08-30
2022-10-02
2022-10-15
2022-10-19
2022-11-04
2022-11-05
2022-11-19
2022-12-25
\.


                                                                                                                                                                                                                                                                         3338.dat                                                                                            0000600 0004000 0002000 00000000403 14176235532 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        a@lnmiit	8	30	0	0
e@lnmiit	8	30	0	0
b@lnmiit	8	30	0	0
c@lnmiit	8	30	0	0
d@lnmiit	8	30	0	0
f@lnmiit	8	30	0	0
g@lnmiit	8	30	0	0
h@lnmiit	8	30	0	0
i@lnmiit	8	30	0	0
j@lnmiit	8	30	0	0
k@lnmiit	8	30	0	0
l@lnmiit	8	30	0	0
m@lnmiit	8	30	0	0
raj@lnmiit	8	30	9	0
\.


                                                                                                                                                                                                                                                             3337.dat                                                                                            0000600 0004000 0002000 00000000624 14176235532 0014263 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        raj@lnmiit	Raj Chordia	F	CSE	12345678
a@lnmiit	a x	H	CSE	12345678
b@lnmiit	b x	H	CCE	12345678
c@lnmiit	c x	H	ECE	12345678
d@lnmiit	d x	H	MME	12345678
e@lnmiit	e x	N	\N	12345678
f@lnmiit	f x	O	\N	12345678
g@lnmiit	g x	D	CSE	12345678
h@lnmiit	h x	R	\N	12345678
i@lnmiit	i x	X	CSE	12345678
j@lnmiit	j x	F	CSE	12345678
k@lnmiit	k x	F	CSE	12345678
l@lnmiit	l x	F	MME	12345678
m@lnmiit	m x	F	CSE	12345678
\.


                                                                                                            3334.dat                                                                                            0000600 0004000 0002000 00000000534 14176235532 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        raj	raj	raj
raj	raj	raj
raj	raj	raj
rajcdasdf	rajfasdfa	rajfasdfa
rajcdasdf	rajfasdfa	rajfasdfa
rajchordia	rajchordia09@gmail.com	12345678
avinav jain	admin@google.com	fsdasfnasd
avinav jain	admin@google.com	fsdasfnasd
raj chordia	saishruti05@gmail.com	1234567
raj chordia	saishruti05@gmail.com	1234567
Raj Chordia	rajjainn14@gmail.com	213456
\.


                                                                                                                                                                    3339.dat                                                                                            0000600 0004000 0002000 00000000476 14176235532 0014272 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        raj@lnmiit	Special Leave	Raj Chordia	2021-12-30	2022-01-09	Conference	indocrypt 2021	Done	\N	A	9	t	\N	D	F	CSE
raj@lnmiit	Privilege Leave	Raj Chordia	2022-01-05	2022-01-15	Conference	IIT Kanpur		\N	D	9	f	\N	D	F	CSE
raj@lnmiit	Privilege Leave	Raj Chordia	2022-01-05	2022-01-15	Conference	\N	\N	\N	P	9	\N	\N	H	F	CSE
\.


                                                                                                                                                                                                  restore.sql                                                                                         0000600 0004000 0002000 00000013255 14176235532 0015402 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Leave_Manage";
--
-- Name: Leave_Manage; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Leave_Manage" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';


ALTER DATABASE "Leave_Manage" OWNER TO postgres;

\connect "Leave_Manage"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application (
    type text,
    s_date date,
    e_date date,
    numdays integer,
    remarks text,
    fid text
);


ALTER TABLE public.application OWNER TO postgres;

--
-- Name: director; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.director (
    fac_name text,
    start_date text,
    end_date text,
    remark text
);


ALTER TABLE public.director OWNER TO postgres;

--
-- Name: holidays; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.holidays (
    dates date
);


ALTER TABLE public.holidays OWNER TO postgres;

--
-- Name: leaves; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leaves (
    fid text NOT NULL,
    cl bigint NOT NULL,
    pl bigint NOT NULL,
    sl bigint NOT NULL,
    dl bigint NOT NULL
);


ALTER TABLE public.leaves OWNER TO postgres;

--
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    staff_id text NOT NULL,
    name text NOT NULL,
    role "char" NOT NULL,
    dept text,
    password text DEFAULT 12345678 NOT NULL
);


ALTER TABLE public.login OWNER TO postgres;

--
-- Name: login_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_data (
    name text,
    email text,
    password text
);


ALTER TABLE public.login_data OWNER TO postgres;

--
-- Name: record; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.record (
    fid text NOT NULL,
    type text NOT NULL,
    "user" text,
    s_date date NOT NULL,
    e_date date NOT NULL,
    reason text,
    "rembyHOD" text,
    "rembyDOFA" text,
    rembydir text,
    status "char" NOT NULL,
    numdays integer NOT NULL,
    "recbyHOD" boolean,
    "recbyDOFA" boolean,
    auth "char",
    role "char" NOT NULL,
    dept text NOT NULL
);


ALTER TABLE public.record OWNER TO postgres;

--
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application (type, s_date, e_date, numdays, remarks, fid) FROM stdin;
\.
COPY public.application (type, s_date, e_date, numdays, remarks, fid) FROM '$$PATH$$/3336.dat';

--
-- Data for Name: director; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.director (fac_name, start_date, end_date, remark) FROM stdin;
\.
COPY public.director (fac_name, start_date, end_date, remark) FROM '$$PATH$$/3335.dat';

--
-- Data for Name: holidays; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.holidays (dates) FROM stdin;
\.
COPY public.holidays (dates) FROM '$$PATH$$/3340.dat';

--
-- Data for Name: leaves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaves (fid, cl, pl, sl, dl) FROM stdin;
\.
COPY public.leaves (fid, cl, pl, sl, dl) FROM '$$PATH$$/3338.dat';

--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login (staff_id, name, role, dept, password) FROM stdin;
\.
COPY public.login (staff_id, name, role, dept, password) FROM '$$PATH$$/3337.dat';

--
-- Data for Name: login_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_data (name, email, password) FROM stdin;
\.
COPY public.login_data (name, email, password) FROM '$$PATH$$/3334.dat';

--
-- Data for Name: record; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record (fid, type, "user", s_date, e_date, reason, "rembyHOD", "rembyDOFA", rembydir, status, numdays, "recbyHOD", "recbyDOFA", auth, role, dept) FROM stdin;
\.
COPY public.record (fid, type, "user", s_date, e_date, reason, "rembyHOD", "rembyDOFA", rembydir, status, numdays, "recbyHOD", "recbyDOFA", auth, role, dept) FROM '$$PATH$$/3339.dat';

--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (staff_id);


--
-- Name: leaves pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT pk PRIMARY KEY (fid);


--
-- Name: record pk_record; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT pk_record PRIMARY KEY (fid, type, s_date, e_date, status);


--
-- Name: leaves fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT fk FOREIGN KEY (fid) REFERENCES public.login(staff_id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   