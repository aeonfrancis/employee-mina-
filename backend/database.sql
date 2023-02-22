-- Active: 1674971535487@@localhost@5432@ctDB
-- Database: ctDB
-- DROP DATABASE IF EXISTS "ctDB";

CREATE DATABASE "ctDB";

CREATE TABLE
    IF NOT EXISTS public.users (
        user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1),
        name character varying(200) NOT NULL,
        email character varying(200) NOT NULL,
        password character varying(200) NOT NULL,
        user_type character varying(200) NOT NULL,
        remarks character varying(200),
        PRIMARY KEY (user_id),
        UNIQUE (email)
    );

CREATE TABLE
    IF NOT EXISTS public.log_entry (
        entry_id integer NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1),
        name character varying(100) NOT NULL,
        purpose character varying(200) NOT NULL,
        time_date timestamp
        with
            time zone NOT NULL,
            remarks character varying(200) NOT NULL,
            access_id integer NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS public.access (
        access_id integer NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1),
        user_id integer NOT NULL,
        logbook_name character varying(200) NOT NULL,
        logbook_type character varying(100) NOT NULL,
        PRIMARY KEY (access_id)
    );

ALTER TABLE
    IF EXISTS public.log_entry
ADD
    FOREIGN KEY (access_id) REFERENCES public.access (access_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID;

ALTER TABLE
    IF EXISTS public.access
ADD
    CONSTRAINT access_fk FOREIGN KEY (user_id) REFERENCES public.users (user_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID;

END;