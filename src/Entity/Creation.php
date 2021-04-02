<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CreationRepository")
 */
class Creation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titleKey;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $subTitleKey;

    /**
     * @ORM\Column(type="text")
     */
    private $descriptionKey;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $backgroundColor;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $color;

    /**
     * @ORM\Column(type="string", length=7)
     */
    private $hoverColor;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\BigType", mappedBy="creations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $bigTypes;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="creations")
     */
    private $tags;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Technology", inversedBy="creations")
     */
    private $technologies;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Vignette", inversedBy="creation", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $vignette;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Type", inversedBy="creations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $type;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $date;

    public function __construct()
    {
        $this->bigTypes = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->technologies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitleKey(): ?string
    {
        return $this->titleKey;
    }

    public function setTitleKey(string $titleKey): self
    {
        $this->titleKey = $titleKey;

        return $this;
    }

    public function getSubTitleKey(): ?string
    {
        return $this->subTitleKey;
    }

    public function setSubTitleKey(string $subTitleKey): self
    {
        $this->subTitleKey = $subTitleKey;

        return $this;
    }

    public function getDescriptionKey(): ?string
    {
        return $this->descriptionKey;
    }

    public function setDescriptionKey(string $descriptionKey): self
    {
        $this->descriptionKey = $descriptionKey;

        return $this;
    }

    public function getBackgroundColor(): ?string
    {
        return $this->backgroundColor;
    }

    public function setBackgroundColor(string $backgroundColor): self
    {
        $this->backgroundColor = $backgroundColor;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getHoverColor(): ?string
    {
        return $this->hoverColor;
    }

    public function setHoverColor(string $hoverColor): self
    {
        $this->hoverColor = $hoverColor;

        return $this;
    }

    /**
     * @return Collection|BigType[]
     */
    public function getBigTypes(): Collection
    {
        return $this->bigTypes;
    }

    /**
     * @return String
     */
    public function getBigTypeIds(): String
    {
        $bigTypeIds = [];

        /** @var BigType $bigType */
        foreach ($this->bigTypes as $bigType) {
            $bigTypeIds[] = $bigType->getId();
        }

        return '['.implode(',', $bigTypeIds).']';
    }

    public function addBigType(BigType $bigType): self
    {
        if (!$this->bigTypes->contains($bigType)) {
            $this->bigTypes[] = $bigType;
        }

        return $this;
    }

    public function removeBigType(BigType $bigType): self
    {
        if ($this->bigTypes->contains($bigType)) {
            $this->bigTypes->removeElement($bigType);
        }

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    /**
     * @return Collection|Technology[]
     */
    public function getTechnologies(): Collection
    {
        return $this->technologies;
    }

    public function addTechnology(Technology $technology): self
    {
        if (!$this->technologies->contains($technology)) {
            $this->technologies[] = $technology;
        }

        return $this;
    }

    public function removeTechnology(Technology $technology): self
    {
        if ($this->technologies->contains($technology)) {
            $this->technologies->removeElement($technology);
        }

        return $this;
    }

    public function getVignette(): ?Vignette
    {
        return $this->vignette;
    }

    public function setVignette(Vignette $vignette): self
    {
        $this->vignette = $vignette;

        return $this;
    }

    public function getType(): ?type
    {
        return $this->type;
    }

    public function setType(?type $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }
}
