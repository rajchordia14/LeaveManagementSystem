--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

-- Started on 2022-02-01 23:13:06

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
-- TOC entry 211 (class 1259 OID 16415)
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
-- TOC entry 210 (class 1259 OID 16410)
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
-- TOC entry 215 (class 1259 OID 16787)
-- Name: holidays; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.holidays (
    dates date
);


ALTER TABLE public.holidays OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16428)
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
-- TOC entry 212 (class 1259 OID 16420)
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
-- TOC entry 209 (class 1259 OID 16405)
-- Name: login_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_data (
    name text,
    email text,
    password text
);


ALTER TABLE public.login_data OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16445)
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
-- TOC entry 3336 (class 0 OID 16415)
-- Dependencies: 211
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application (type, s_date, e_date, numdays, remarks, fid) FROM stdin;
Firefox	2021-11-10	2021-11-14	4	sick	\N
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


--
-- TOC entry 3335 (class 0 OID 16410)
-- Dependencies: 210
-- Data for Name: director; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.director (fac_name, start_date, end_date, remark) FROM stdin;
raj	08/11/2021	09/11/2021	sick
aviina	08/11/2021	09/11/2021	sick
abc	08/11/2021	09/11/2021	sick
fasdf	08/11/2021	09/11/2021	sick
aviina	08/11/2021	09/11/2021	sick
abc	08/11/2021	09/11/2021	sick
fasdf	08/11/2021	09/11/2021	sick
\.


--
-- TOC entry 3340 (class 0 OID 16787)
-- Dependencies: 215
-- Data for Name: holidays; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.holidays (dates) FROM stdin;
2021-12-25
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


--
-- TOC entry 3338 (class 0 OID 16428)
-- Dependencies: 213
-- Data for Name: leaves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaves (fid, cl, pl, sl, dl) FROM stdin;
a@lnmiit	8	30	0	0
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


--
-- TOC entry 3337 (class 0 OID 16420)
-- Dependencies: 212
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login (staff_id, name, role, dept, password) FROM stdin;
raj@lnmiit	Raj Chordia	F	CSE	12345678
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


--
-- TOC entry 3334 (class 0 OID 16405)
-- Dependencies: 209
-- Data for Name: login_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_data (name, email, password) FROM stdin;
raj	raj	raj
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


--
-- TOC entry 3339 (class 0 OID 16445)
-- Dependencies: 214
-- Data for Name: record; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.record (fid, type, "user", s_date, e_date, reason, "rembyHOD", "rembyDOFA", rembydir, status, numdays, "recbyHOD", "recbyDOFA", auth, role, dept) FROM stdin;
raj@lnmiit	Special Leave	Raj Chordia	2021-12-30	2022-01-09	Conference	indocrypt 2021	Done	\N	A	9	t	\N	D	F	CSE
raj@lnmiit	Privilege Leave	Raj Chordia	2022-01-05	2022-01-15	Conference	IIT Kanpur		\N	D	9	f	\N	D	F	CSE
raj@lnmiit	Privilege Leave	Raj Chordia	2022-01-05	2022-01-15	Conference	\N	\N	\N	P	9	\N	\N	H	F	CSE
\.


--
-- TOC entry 3189 (class 2606 OID 16426)
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (staff_id);


--
-- TOC entry 3191 (class 2606 OID 16434)
-- Name: leaves pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT pk PRIMARY KEY (fid);


--
-- TOC entry 3193 (class 2606 OID 16774)
-- Name: record pk_record; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.record
    ADD CONSTRAINT pk_record PRIMARY KEY (fid, type, s_date, e_date, status);


--
-- TOC entry 3194 (class 2606 OID 16435)
-- Name: leaves fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT fk FOREIGN KEY (fid) REFERENCES public.login(staff_id);


-- Completed on 2022-02-01 23:13:07

--
-- PostgreSQL database dump complete
--

