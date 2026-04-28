CREATE TABLE projet
(
    id_projet         BIGINT       NOT NULL,
    titre             VARCHAR(255) NOT NULL,
    `description`     VARCHAR(255) NOT NULL,
    progres           INT          NOT NULL,
    date_debut        date         NOT NULL,
    date_fin          date         NOT NULL,
    id_chef_de_projet BIGINT NULL,
    CONSTRAINT pk_projet PRIMARY KEY (id_projet)
);

CREATE TABLE task
(
    id                BIGINT AUTO_INCREMENT NOT NULL,
    titre             VARCHAR(255) NULL,
    `description`     TEXT NULL,
    parent_task_id    BIGINT NULL,
    developpeur_id    BIGINT NULL,
    projet_id         BIGINT NULL,
    date_creation     datetime NULL,
    date_modification datetime NULL,
    status            VARCHAR(255) NOT NULL,
    progress          INT          NOT NULL,
    periorite         SMALLINT     NOT NULL,
    CONSTRAINT pk_task PRIMARY KEY (id)
);

CREATE TABLE user
(
    id_user              BIGINT       NOT NULL,
    user_type            VARCHAR(31) NULL,
    nom                  VARCHAR(255) NOT NULL,
    prenom               VARCHAR(255) NOT NULL,
    email                TEXT         NOT NULL,
    mot_de_passe         TEXT NULL,
    num_telephone        VARCHAR(255) NOT NULL,
    date_de_naissance    date NULL,
    `role`               VARCHAR(255) NULL,
    adresse              VARCHAR(255) NULL,
    date_de_creation     datetime NULL,
    date_de_modification datetime NULL,
    CONSTRAINT pk_user PRIMARY KEY (id_user)
);

ALTER TABLE user
    ADD CONSTRAINT uc_user_email UNIQUE (email);

ALTER TABLE user
    ADD CONSTRAINT uc_user_numtelephone UNIQUE (num_telephone);

ALTER TABLE projet
    ADD CONSTRAINT FK_PROJET_ON_ID_CHEFDEPROJET FOREIGN KEY (id_chef_de_projet) REFERENCES user (id_user);

ALTER TABLE task
    ADD CONSTRAINT FK_TASK_ON_DEVELOPPEUR FOREIGN KEY (developpeur_id) REFERENCES user (id_user);

ALTER TABLE task
    ADD CONSTRAINT FK_TASK_ON_PARENT_TASK FOREIGN KEY (parent_task_id) REFERENCES task (id);

ALTER TABLE task
    ADD CONSTRAINT FK_TASK_ON_PROJET FOREIGN KEY (projet_id) REFERENCES projet (id_projet);