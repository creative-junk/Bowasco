<?php
/*********************************************************************************
 * Developed by Maxx Ng'ang'a
 * (C) 2017 Crysoft Dynamics Ltd
 * Karbon V 2.1
 * User: Maxx
 * Date: 9/27/2017
 * Time: 5:25 PM
 ********************************************************************************/

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="sale")
 */
class Sale
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="string")
     */
    private $id;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Processors")
     */
    private $soldTo;
    /**
     * @ORM\Column(type="string")
     */
    private $nrLitres;
    /**
     * @ORM\Column(type="string")
     */
    private $pricePerLitre;
    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     */
    private $soldBy;
    /**
     * @ORM\Column(type="datetime")
     */
    private $soldAt;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getSoldTo()
    {
        return $this->soldTo;
    }

    /**
     * @param mixed $soldTo
     */
    public function setSoldTo($soldTo)
    {
        $this->soldTo = $soldTo;
    }

    /**
     * @return mixed
     */
    public function getNrLitres()
    {
        return $this->nrLitres;
    }

    /**
     * @param mixed $nrLitres
     */
    public function setNrLitres($nrLitres)
    {
        $this->nrLitres = $nrLitres;
    }

    /**
     * @return mixed
     */
    public function getPricePerLitre()
    {
        return $this->pricePerLitre;
    }

    /**
     * @param mixed $pricePerLitre
     */
    public function setPricePerLitre($pricePerLitre)
    {
        $this->pricePerLitre = $pricePerLitre;
    }

    /**
     * @return mixed
     */
    public function getSoldBy()
    {
        return $this->soldBy;
    }

    /**
     * @param mixed $soldBy
     */
    public function setSoldBy($soldBy)
    {
        $this->soldBy = $soldBy;
    }

    /**
     * @return mixed
     */
    public function getSoldAt()
    {
        return $this->soldAt;
    }

    /**
     * @param mixed $soldAt
     */
    public function setSoldAt($soldAt)
    {
        $this->soldAt = $soldAt;
    }

}